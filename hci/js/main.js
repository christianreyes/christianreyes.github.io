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
            threshold:60
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
            threshold:60
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
            changePage(this, $(this).attr("data-target"), e);
        });
        
        $('a.back').click(function(e){
            changePage(this, "shop", e);
        });
        
        $(".offerdetail").swipe( {
            //Generic swipe handler for all directions
            swipe:function(event, direction, distance, duration, fingerCount) {
                if(direction == "right") {
                    var dest = "#shop"
                    $(this).closest('div[data-role="page"]').hide();
                    $(dest).show();
                }
            },
            //Default is 75px, set to 0 for demo so any distance triggers swipe
            threshold:60,
            allowPageScroll:"vertical"
        });
        
        $('a.menu').click(function(e){
            var page = $(this).closest('div[data-role="page"]');
            var header = $(this).closest('div[data-role="header"]');

            e.preventDefault();

                        if(page.hasClass("menucollapsed")){
                            page.css("left", "100px");
                            header.css("left", "100px");
                            page.addClass("menuextended").removeClass('menucollapsed');
                        } else {
                            page.css("left", 0);
                            header.css("left", 0);
                            page.addClass("menucollapsed").removeClass('menuextended');
                        }
        });
    };
    
    var changePage = function(thisElement, page, event){
        event.preventDefault();
        var dest = $(thisElement).attr("data-target");
        if(!dest)
            dest = $(thisElement).attr("href");
        $(thisElement).closest('div[data-role="page"]').hide();
        $(dest).show();
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