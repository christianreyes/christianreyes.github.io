//forge.logging.info("Add JavaScript to js/main.js!");

$(function(){
    
    var loadPages = function(){
        var tasks = [];
        var pages = [
                        "phone", 
                        "tutorial1",
                        "tutorial2", 
                        "tutorial3", 
                        "shop",
                        "offer1"
                    ];
        
        $(pages).each(function(ind, obj){
            var task = function(callback){
                $('<div class="temp"></div>').load(obj + '.html div[data-role="page"]', function(){
                    $(this).find('div[data-role="page"]').css('display', 'none');
                    $('body').append($(this).html());
                    callback(null, null);
                });  
            };
            
            tasks.push(task);
        });
        
        async.series(tasks, function(err, results){
            console.log('pages loaded!');
            setDomEvents();
        });
    };
    
    var setDomEvents = function(){
        
        $('img.logo').animate({
           'top':"10px" 
        });
        
        $('img.loader').fadeOut();
        
        setTimeout(function(){
            $("#fhome").fadeIn();
        }, 1000);
        
        $('a.transition').click(function(e){
            e.preventDefault();
            var dest = $(this).attr("href");
            $(this).closest('div[data-role="page"]').hide();
            $(dest).show();
        });      
        
        $(".tutorial1").swipe( {
            //Generic swipe handler for all directions
            swipe:function(event, direction, distance, duration, fingerCount) {
                if(direction == "left") {
                    var dest = "#tutorial2"
                    $(this).closest('div[data-role="page"]').hide();
                    $(dest).show();
                }
                if(direction == "right") {
                    var dest = "#splash"
                    $(this).closest('div[data-role="page"]').hide();
                    $(dest).show();
                }
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold:20
        });
        
        $(".tutorial2").swipe( {
            //Generic swipe handler for all directions
            swipe:function(event, direction, distance, duration, fingerCount) {
                if(direction == "left") {
                    var dest = "#tutorial3"
                    $(this).closest('div[data-role="page"]').hide();
                    $(dest).show();
                }
                if(direction == "right") {
                    var dest = "#tutorial1"
                    $(this).closest('div[data-role="page"]').hide();
                    $(dest).show();
                }
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold:20
        });
        
        $(".tutorial3").swipe( {
            //Generic swipe handler for all directions
            swipe:function(event, direction, distance, duration, fingerCount) {
                if(direction == "left") {
                    alert("Congrats! You have completed registration!")
                    var dest = "#shop"
                    $(this).closest('div[data-role="page"]').hide();
                    $(dest).show();
                }
                if(direction == "right") {
                    var dest = "#tutorial2"
                    $(this).closest('div[data-role="page"]').hide();
                    $(dest).show();
                }
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold:20
        });
        
        $('ul.rewards li').click(function(e){
            e.preventDefault();
            var dest = $(this).attr("data-target");
            $(this).closest('div[data-role="page"]').hide();
            $(dest).show();
        })
    };
    
    loadPages();
    
    $('#splash img.logo').bind("load", function () { 
        $(this).fadeIn(1000); 
    });
    
    $('#splash img.loader').bind("load", function () { 
        $(this).fadeIn(1000); 
    });
    
    var points = parseInt($('#points h2').text());
    
    
    
    $('.offerdetail').swipe( {
            //Generic swipe handler for all directions
            swipe:function(event, direction, distance, duration, fingerCount) {
              if(direction == "right")
                window.location = "shop.html"
              else
                 return true;
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
             threshold:20,
             allowPageScroll:"vertical"
          });
    
    $('#shop .menu').click(function(){
        window.location = "myrewards.html"
    })
    
    $('#myrewards .menu').click(function(){
        window.location = "shop.html"
    })
    
    $('.back').click(function(){
        window.location = "shop.html"
    });
    
    
    $('.offerdetail button').click(function(){
        /*
        var buttonPoints = parseInt($('span', this).text());
        points -= buttonPoints;
        
        $('#points h2').text(points);
        
        */
        
        window.location = "myrewards.html"

    });
    
    setTimeout(function(){
                $('#first').fadeIn();
    }, 1000)
});