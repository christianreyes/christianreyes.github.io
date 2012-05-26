$(function(){
  var circle = $('#circle');
  var x = 10;
  var y = 10;
  
  $(window).mousemove(function(e){
    x = e.clientX;
    y = e.clientY;
    
    //circle.css("top", y + "px").css("left", x + "px");
  });
  
  function moveCircle(){
    var bezier_params = {
        start: { 
          x: parseInt(circle.css("left")), 
          y: parseInt(circle.css("top")), 
          angle: 25
        },  
        end: { 
          x:x + (Math.random() > .5 ? 1 : -1 ) * Math.random() * 50,
          y:y + (Math.random() > .5 ? 1 : -1 ) * Math.random() * 50,
          angle: -25, 
          //length: 0.25
        }
      };
    
    circle.stop().animate({path : new $.path.bezier(bezier_params)}, 1000, function(){
      setTimeout(function(){
        moveCircle();
      }, 1000);
    });
  }
  
  moveCircle();
});