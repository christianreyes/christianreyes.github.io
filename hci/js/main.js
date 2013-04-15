//forge.logging.info("Add JavaScript to js/main.js!");

$(function(){
    $('.flexslider').flexslider();
    
   $('#login form').submit(function(e){
       e.preventDefault();
       if($('#txtandrewid').val() == 'test') { 
           $.mobile.changePage('index.html#rewards');

       } else {
           $.mobile.changePage('index.html#phone');
       }
       return false;
   });
   
   
});