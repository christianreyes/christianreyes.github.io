$(function(){
	
	/*
	setTimeout(function(){
		$('#stripe_outer').animate({top: 0, margin: 0}, 1000);
	}, 2000);
	*/

	
	//if(jQuery.browser.mobile == false) {
		var key_to_xy = { 
		                    /* left */  37: { x: -1, y:  0 }, 
		                    /* up   */  38: { x:  0, y: -1 }, 
		                    /* right */ 39: { x:  1, y:  0 }, 
		                    /* down */  40: { x:  0, y:  1 } 
		                };

		var DELAY = 250;
		var keyHeld = 39;
		var animating = false;

		var paper = Raphael("wrapper", "100%", "100%");

		var MAX_LENGTH = 11;
		var tail = [];

		// Creates circle at x = 50, y = 40, with radius 10
		var circle = paper.circle(-50, $(window).height() / 2 - 100 + Math.random() * 100 , 20);

		circle.attr({
			  fill: "#f00",
		      //"fill": "r(0.5, 0.5)#f00-#800",
		      "fill-opacity": 0.4,
			  stroke: 0
		});

		$(window).bind("keydown", function(e){
			// cross-browser support for keycode
	        var key = e.keyCode ? e.keyCode : e.which;
		
			if(key_to_xy.hasOwnProperty(key)){
				keyHeld = key;
				e.preventDefault();	
			}
		});

		$(window).bind("keyup", function(e){
			// cross-browser support for keycode
	        var key = e.keyCode ? e.keyCode : e.which;
	

			if(key === keyHeld)
				keyHeld = null;	

			e.preventDefault();
		});
		
		var random = false;
		
		setTimeout(function(){
			random = true;
		}, 5000);
		
		var dirs = [37,38,39,40];
		
		function newDirection(){
			var delt = null;
			
			if(Math.random() < .65)
				delt = 0;
			else
			{
				if(Math.random() < .5)
					delt = -1;
				else
					delt = 1;
			}
			
			//var delt = Math.floor(-1 + Math.random() * 3);
			var newDir = keyHeld - 37 + delt;
			
			if(newDir < 0)
				newDir+= 4;
			else if(newDir >= 4) {
				newDir-= 4;
			}
			
			var delt = key_to_xy[dirs[newDir]];

			nx = circle.attr('cx') + 30 * delt.x;
			ny = circle.attr('cy') + 30 * delt.y;
			
			if(nx > $(window).width()){
				newDir = 0;
			}				
			else if(nx < 0){
				newDir = 2;
			}
			else if(ny > $(window).height() ){
				newDir = 1;
			}
			else if(ny < 0){
				newDir = 3;
			}
						
			return newDir;
		}
		
		var randKey = null;
		
		setTimeout(function(){
			setInterval(function(){
				if(keyHeld == null)
					keyHeld = 39;
					
				keyHeld = dirs[newDirection()];
			}, 1000);	
		}, 1000);

		setInterval(function(){				
			if(keyHeld !== null && !animating ) {
				var xy_diffs = key_to_xy[ keyHeld ];

				//circle.transform("...t" + xy_diffs.x  + "," + xy_diffs.y);
				animating = true;

				
				var anim = Raphael.animation({
												cx: circle.attr('cx') + xy_diffs.x * 50,
												cy: circle.attr('cy') + xy_diffs.y * 50
											  }, 
											  DELAY,
											  function(){ 
												animating = false;
											  });

				var temp = paper.circle(circle.attr('cx'), circle.attr('cy'), 15);

				if(tail.length == MAX_LENGTH)
					tail.shift();

				for(var i=0;i<tail.length;i++){
					
					var shrink = Raphael.animation({ 
										r: 15 * ( i / tail.length ),
										"fill-opacity": .4 * ( i / tail.length )
									  },
									  DELAY 
									  )
									
					tail[i].animateWith(circle, anim, shrink);
					
					//tail[i].attr("r", 15 * ( i / tail.length ));
					//tail[i].attr("fill-opacity", .4 * ( i / tail.length ));
				}

				tail.push(temp);

				temp.attr({
					fill: "#f77",
					//"fill": "r(0.5, 0.5)#f00-#800",
				    "fill-opacity": 0.4,
					stroke: 0
				});

				circle.animate(anim);	
			}
		}, 10);	
	//}
})