$(function(){
	
	setTimeout(function(){
		$('#stripe_outer').animate({top: 0, margin: 0}, 1000)
	}, 2000);

	
	if(jQuery.browser.mobile == false) {
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

		var MAX_LENGTH = 15;
		var tail = [];

		// Creates circle at x = 50, y = 40, with radius 10
		var circle = paper.circle(-20, 400, 20);

		circle.attr({
		      "fill": "r(0.5, 0.5)#f00-#800",
		      "fill-opacity": 0.5,
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


		setInterval(function(){
			if(keyHeld !== null && !animating ) {
				var xy_diffs = key_to_xy[ keyHeld ];

				//circle.transform("...t" + xy_diffs.x  + "," + xy_diffs.y);
				animating = true;

				var temp = paper.circle(circle.attr('cx'), circle.attr('cy'), 15);

				if(tail.length == MAX_LENGTH)
					tail.shift();

				for(var i=0;i<tail.length;i++){
					tail[i].attr("r", 15 * ( i / tail.length ));
					tail[i].attr("fill-opacity", .4 * ( i / tail.length ));
				}

				tail.push(temp);

				temp.attr({
					"fill": "r(0.5, 0.5)#f00-#800",
				    "fill-opacity": 0.4,
					stroke: 0
				});

				var anim = Raphael.animation({
												cx: circle.attr('cx') + xy_diffs.x * 50,
												cy: circle.attr('cy') + xy_diffs.y * 50
											  }, 
											  DELAY / 2,
											  function(){ 
												animating = false;
											  });

				circle.animate(anim);	
			}
		}, DELAY / 10);	
	}
})