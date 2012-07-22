$(function(){
  $('body').append($('<div>Page loaded<div>'));
  
  window.ondevicemotion = function(event) {
    $('body').append($('<div>').text(event.acceleration.x + 
                               ',' + event.acceleration.y + 
                               ',' + event.acceleration.z +
                               ',' + new Date()));
  }  
});