$(function(){
  var myRequest = new panoramio.PhotoRequest({
    'tag': 'sunset',
    'rect': {'sw': {'lat': -30, 'lng': 10.5}, 'ne': {'lat': 50.5, 'lng': 30}}
  });
  
  console.log(myRequest);
})