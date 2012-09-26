package lab1;

import edu.cmu.ri.mrpl.*;

public class TrackTask extends Task{
	
	private Robot robot;
	private Application app;
	
	TrackTask(Application a) {
		super(a);
		app = a;
		robot = a.robot;
	}

	//a fixed angle multiplier of how much the sonar 360degs/ 16 sonars
	double SONAR_ANGLE = Math.PI / 8.0;
	
	//for any sonar, we compute an angle with respect to the origin of the robot,
	// via the index or position of this particular sonar
	public double getSonarAngle(int ind){
		return SONAR_ANGLE * (double)ind;
	}

	public void taskRun() {
		app.showSC();
		robot.turnSonarsOn();

		double[] sonars = new double[16];
		while(!shouldStop()) {
			robot.updateState();
			robot.getSonars(sonars);
			app.sc.setSonars(sonars);
			
			if (robot.getBumpers()!=0) {
				System.err.println("detecting bumping, stopping!");
				break;
			}

			//robot.setVel(0.2, .15);

			double closestDistance = 999999;
			int closestSonar = -1;
			
			//finding the closest Sonar
			for(int i = 0; i<sonars.length; i++)
			{
				if(sonars[i] != Double.POSITIVE_INFINITY)
				{
					if(sonars[i] < closestDistance)
					{
						closestDistance = sonars[i];
						closestSonar = i;
					}
				}
			}
			
			//returns the angle of the closest sonar
			double sonarAngle = getSonarAngle(closestSonar);
			
			//calculates the target heading according to the coordinate system of the robot
			//allows us to change the robots facing position with the goal facing position
			double theading = (robot.getHeading() + sonarAngle) % (Math.PI * 2.0);
			
			//the smallest signed angle between the robot and the closest sonar
			double diff = Math.atan2(Math.sin(theading-robot.getHeading()), Math.cos(theading-robot.getHeading()));
			
			System.out.println(robot.getHeading() + "\t" + sonarAngle + "\t" + theading + "\t"+ diff);
			//if the diff is greater than .2 radians; we found that if this difference / pi was greater than 11 degrees, we'd move the heading.			
			if(diff > .2) //if positive difference, angle is on the left
			{
				robot.setVel(-1 * trackSpeed(diff), trackSpeed(diff));
//						System.out.println("LEFT!");
			}
			else if(diff < -.2){ //otherwise on the right
				robot.setVel(-1 * trackSpeed(diff),trackSpeed(diff));
//						System.out.println("RIGHT!");
			}
			else //center
			{
				/*
				if(sonars[0] > .5)
					robot.setVel(.25, .25);
				else
				*/
					robot.setVel(0,0);
//						System.out.println("STOP!");
			}
			
			try {
				Thread.sleep(1);
			} catch(InterruptedException iex) {
				System.out.println("\"Both\" sleep interrupted");
			}
		}

		robot.turnSonarsOff();
		robot.setVel(0.0f, 0.0f);
		app.hideSC();
	}
	

	public double trackSpeed(double diff){
		return diff * .179;
	}

}
