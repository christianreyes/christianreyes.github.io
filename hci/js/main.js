//forge.logging.info("Add JavaScript to js/main.js!");

$(function(){
    
    localStorage.test = 5;
    
    //$('div[data-role="page"]:gt(0)').css('display', "none");
    
    var points = parseInt($('#points h2').text());
    
    $('.flexslider').flexslider();
    

    
    $('#login form').submit(function(e){
        e.preventDefault();
        if($('#txtandrewid').val() == 'test') { 
           //$.mobile.changePage('index.html#rewards');
           window.location = "rewards.html"
        } else {
           //$.mobile.changePage('index.html#phone');
           window.location = "phone.html"
        }
        return false;
    });
    
    $('#phone form').submit(function(e){
        e.preventDefault();
        window.location = "tutorial1.html"
        return false;
    });
    
    $(".tutorial1").swipe( {
            //Generic swipe handler for all directions
            swipe:function(event, direction, distance, duration, fingerCount) {
              if(direction == "left")
                window.location = "tutorial2.html"
              if(direction == "right")
                window.location = "login.html"
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
             threshold:20
          });

    $(".tutorial2").swipe( {
      //Generic swipe handler for all directions
      swipe:function(event, direction, distance, duration, fingerCount) {
        if(direction == "left")
          window.location = "tutorial3.html"
        if(direction == "right")
          window.location = "tutorial1.html"
      },
      //Default is 75px, set to 0 for demo so any distance triggers swipe
       threshold:20
    });

    $(".tutorial3").swipe( {
      //Generic swipe handler for all directions
      swipe:function(event, direction, distance, duration, fingerCount) {
        if(direction == "left"){
            alert("Congrats! You have completed enrollment!")
            window.location = "shop.html"   
        }
        if(direction == "right")
          window.location = "tutorial2.html"
      },
      //Default is 75px, set to 0 for demo so any distance triggers swipe
       threshold:20
    });
    
    $('.offerdetail a.button').click(function(){
        var buttonPoints = parseInt($('span', this).text());
        points -= buttonPoints;
        
        $('#points h2').text(points);
        setTimeout(function(){
                    $('#first').fadeIn();
        }, 1000)

    });
    
    /*
    $.get('login.html', function(data){
        alert(data)
    })
    */
    
    /*
    setTimeout(function(){
        var fetch = $('<div></div>').load('phone.html')
        
        fetch.css({
          width: "100%",
          position: 'absolute',
          top: 0,
          left: (window.innerWidth)+'px'
        });
        
        $('#wrapper').append(fetch);
        
        $('div[data-role="page"]:first').animate({
            left: -(window.innerWidth)+'px'
        }, 300)
        
        $(fetch).animate({
            left: 0
        }, 300)
        
        
    }, 2000);
    */
});