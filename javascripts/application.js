$(function(){
	
	/*
	setTimeout(function(){
		$('#stripe_outer').animate({top: 0, margin: 0}, 1000);
	}, 2000);
	*/

	//$('#wrapper').height($(window).height())l
	
	//if(jQuery.browser.mobile == false) {
		var key_to_xy = { 
		                    /* left */  37: { x: -1, y:  0 }, 
		                    /* up   */  38: { x:  0, y: -1 }, 
		                    /* right */ 39: { x:  1, y:  0 }, 
		                    /* down */  40: { x:  0, y:  1 } 
		                };

		var DELAY = 250;
		var keyHeld = null;
		var animating = false;

		var paper = Raphael("wrapper", "100%", "100%");

		var MAX_LENGTH = 11;
		var tail = [];

		// Creates circle at x = 50, y = 40, with radius 10
		var circle = null;
		
		var upDown = Math.random() < .5 ? -1 : 1;
		
		if( Math.random() < .5)
		{
			circle = paper.circle(-50, $(window).height() / 2 + upDown * ( 150 + Math.random() * 100 ) , 20);
			keyHeld = 39;
		}
		else
		{
			circle = paper.circle($(window).width() + 50, $(window).height() / 2 + upDown * ( 150 + Math.random() * 100 )  , 20);
			keyHeld = 37;
		}
			

		circle.attr({
			  fill: Math.random() < .33 ? "#f00" : Math.random() < .5 ? "#00f" : "#0f0" ,
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
				
				var nx = circle.attr('cx') + xy_diffs.x * 50;
				var ny = circle.attr('cy') + xy_diffs.y * 50;
				
				var anim = Raphael.animation({
												cx: nx,
												cy: ny
											  }, 
											  DELAY,
											  function(){ 
												animating = false;
												
												if(reverse)
													circle.attr({
														cx: nx,
														cy: ny
													});
											  });	
											
				circle.animate(anim);
				
				var ww = $(window).width();
				var wh = $(window).height();
				
				var reverse = false;
				if( nx > ww){
					nx = -50;
					reverse = true;
				}
				else if (nx < 0){
					nx = ww + 50;
					reverse = true;
				}
					
				if( ny > wh ){
					ny = -50;
					reverse = true;
				}
				else if( ny < 0){
					ny = wh + 50;
					reverse = true;	
				}

				var temp = paper.circle(circle.attr('cx'), circle.attr('cy'), 15);

				if(tail.length == MAX_LENGTH)
				{
					tail.shift().remove();
					
				}
					

				for(var i=0;i<tail.length;i++){
					
					var shrink = Raphael.animation({ 
										r: 15 * ( i / tail.length ),
										"fill-opacity": .4 * ( i / tail.length )
									  },
									  DELAY 
									  )
									
					tail[i].animate(shrink);
					
					//tail[i].attr("r", 15 * ( i / tail.length ));
					//tail[i].attr("fill-opacity", .4 * ( i / tail.length ));
				}

				tail.push(temp);

				temp.attr({
					fill: circle.attr("fill").replace("0", "7").replace("0", "7"),
					//"fill": "r(0.5, 0.5)#f00-#800",
				    "fill-opacity": 0.4,
					stroke: 0
				});
			}
		}, 10);	
	//}
})