$(function(){
  // ready function
  navigator.geolocation.getCurrentPosition(function(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    $('#latitude').text(latitude);
    $('#longitude').text(longitude);
    
    var uri = "http://www.myweather2.com/developer/forecast.ashx?uac=kmzcojEzpn&output=json&query=" + latitude + "," + longitude;

    jQuery.get(uri, function(res){
      $('#weather').text(res.responseText);
    });
  });
});