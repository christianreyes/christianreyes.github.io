$(function(){
  // ready function
  navigator.geolocation.getCurrentPosition(function(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    $('#latitude').text(latitude);
    $('#longitude').text(longitude);
    
    //$('#weather').load("http://forecast.weather.gov/MapClick.php?lat=" + latitude + "&lon=" + longitude + "&FcstType=dwml")
  });
});