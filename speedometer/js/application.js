$(function(){
   //var paper = Snap("#Speedometer"); 
   //var dial = paper.select("#Inner_Circle");
   
   var dial = $('#Inner_Circle');
   var speed = $("#Speed");
   var gear = $("#Gear");
   
   var angle = 10;
   var mph = 0;
   var gear_num = 1;
   
   setTimeout(function(){
       
       gear.text(String(gear_num));
       
       setInterval(function(){
           angle += 1;

           if(angle >= 300){
               angle = 0;
           }
       }, 1);
       
       setInterval(function(){
           mph += 1;
       }, 50);
       
       setInterval(function(){
           gear_num += 1;
       },800);

       var draw = function(){
           dial.attr("transform", "rotate(" + angle + " 515 364)");

           requestAnimationFrame(draw);
           
           var mph_str = ("00" + mph).slice(-2);
           
           speed.text(mph_str);
           gear.text(gear_num);
       }

       requestAnimationFrame(draw);
       
   }, 2000);   
});