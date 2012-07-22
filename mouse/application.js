$(function(){
  $('body').append($('<div>Page loaded<div>'));
  
  window.ondevicemotion = function(event) {
    $('body').append($('<div>').text(event.acceleration.x + '\t' + event.acceleration.y));
  }  
});