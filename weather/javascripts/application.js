$(function(){
  // ready function
  navigator.geolocation.getCurrentPosition(function(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    $('#latitude').text(latitude);
    $('#longitude').text(longitude);
    
    var uri = "http://ws.geonames.org/findNearByWeatherJSON?lat=" + latitude + "&lng=" + longitude

    $.getJSON(uri, function(data){
      console.log("SUCCESS");
      console.log(data);
      $('#temperature').text(data.weatherObservation.temperature * 1.8 + 32 + "F");
      $('#clouds').text(data.weatherObservation.clouds);
    });
  });
});