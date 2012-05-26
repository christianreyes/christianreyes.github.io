$(function(){
  var circle = $('#circle');
  var x,y;
  
  $(window).mousemove(function(e){
    x = e.clientX;
    y = e.clientY;
    
    //circle.css("top", y + "px").css("left", x + "px");
  });
  
  setInterval(function(){
    var bezier_params = {
        start: { 
          x: parseInt(circle.css("left")), 
          y: parseInt(circle.css("top"))//, 
          //angle: 10
        },  
        end: { 
          x:x,
          y:y//, 
          //angle: -10, 
          //length: 0.25
        }
      }

    circle.animate({path : new $.path.bezier(bezier_params)}, 900);
  }, 1000);
});