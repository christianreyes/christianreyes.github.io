$(function(){
  var circle = $('#circle');
  
  $(window).mousemove(function(e){
    var x = e.clientX;
    var y = e.clientY;
    
    circle.css("top", y + "px").css("left", x + "px");
  });
});