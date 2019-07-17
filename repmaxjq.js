$(document).ready(function(){

    var $hamburger = $("#hamburger");

    $hamburger.on("click", function(){
    $(this).toggleClass("close");
    $('.wrapperNav').toggleClass("closeSide");
    });
    
    function is_touch_device() {
        return (('ontouchstart' in window)
             || (navigator.MaxTouchPoints > 0)
             || (navigator.msMaxTouchPoints > 0));
       }

//on scroll
/*
$(window).on("scroll", function(){
    console.log($("header").offset());
    if($("header").offset().top >= 40){
        $("header").addClass('fix');
    }
    else {
        $("header").removeClass('fix');
    }
});
*/



        var $strengthList = $("#strengthList");
        var $strength = $("#strength");
       
            $strength.on("click",function(){
            $strengthList.toggle();
        });

/*
//slide function


// show or hide divs
var $stretch = $(".stretches");
var $exercise = $(".exercises");
var $workouts = $(".workouts");

//button to show or hide

var buttons = [$('#stretchesButton'),$('#exerciseButton'),$('#workoutButton')];

for(var a = 0; a < buttons.length;a++){

    buttons[a].on("click",function(){
        
        var $slideToShow = $(this).parents(".topic").next();
      
        
       if($slideToShow.attr('id') != 'slide'){
        
        $('#slide').slideUp("slow");
        $(".container").find("#slide").removeAttr('id');
        $slideToShow.attr('id','slide');
        console.log($slideToShow.attr('id'));
        $("#slide").slideDown(1000);
    
        $slideToShow.css({"display":"grid"});
   
        }
        //just incase it does have the slide id aka same button is clicked
        else{
            console.log("yes");
            $('#slide').slideUp("slow");
            $slideToShow.removeAttr('id');
        }
       
    });
    
}
*/

    var lineChart ;
    var form = $("#repMax");
    
    form.on("submit",function(e){

        e.preventDefault();
        $(".maxRep").css("grid-template-columns","1fr 1fr");
        $("#output").css("display","block");
        $("#output button").css("visibility","visible");
        $("#formContainer").css("display","none");
        
        var $reps = $('#reps').val();
        var $resistanceUsed = $('#resistanceUsed').val();
        

        function max(){
            $resistanceUsed = Math.abs($resistanceUsed);
            console.log($resistanceUsed);
            $reps = Math.abs($reps);
             var roundDown = Math.floor(((0.03 * $reps) + 1.0) * $resistanceUsed);
             var remainder = roundDown % 5;
             var maxRep;
         
             if(remainder === 0 ){
                 maxRep = roundDown ;
             }
         
             else if(remainder > 2){
                 var left = 5 - remainder;
                 maxRep = roundDown + left ;
             }
         
             else{
                 maxRep = roundDown - remainder ;
             }
             console.log(maxRep);
             return maxRep;
         
         }


         (function show(){
            var $results = $("#results");
            
           $results.html(function(){
                return "Based on your " + $('#reps').val() + " reps of " +  $('#resistanceUsed').val() + " LBS " + "</br>" + "Your estimated Max Rep is: " + max() + " LBS"
            });
           
        
        }) ();

        var percent = 95;
      
            $("#line").css("display","block");

            //var list = $("#list");

            var percentRep = [max()];

            for(var i=2; i < 13; i++){

            var lbs = (max()*(percent*0.01));
           
            var roundDown = Math.floor(lbs);
            var remainder = roundDown % 5;
           
        
            if(remainder === 0 ){
                percentRep.push(roundDown) ;
            }
        
            else if(remainder > 2){
                var left = 5 - remainder;
                percentRep.push(roundDown + left);
            }
        
            else{
                percentRep.push(roundDown - remainder);
            }

            
              /*$(list).append('<li>'+ i + " reps = " + percent + "% at " + percentRep + " lbs" + '</li>');*/
              percent-=2.5;
            

            }


            //set up chart

           
    var ctx = $("#lineChart");
     lineChart = new Chart(ctx,{
        type: "line",
        data:{
            labels:     (function (){
                var count = [];
                for(var i = 1; i < 13; i++){
                count.push(i);
                }
                return count;
            })() ,
            datasets: [{
                label: "Rep Range",
                data: percentRep,
                backgroundColor:["#f3f3f3","a1a1a1","d1d1d1"],
                borderColor:"white",
                borderWidth:"2",
                //borderDash: [8,15]
             fill:"false",
             pointBackgroundColor:"white",
             pointBorderColor:"green",
             pointBorderWidth:"0",
             pointRadius:"6",
             pointStyle:"circle",
             pointHoverBackgroundColor:"white",
             pointHoverBorderColor:"rgb(18, 267, 236)",
             pointHoverBorderWidth:"2",
             pointHoverRadius:"9",
             showLine:true

            }]
        }, 
        options:{
            responsive: true,
            scales:{
              xAxes:[{
                gridLines:{
                    color:"#0984e3"
                }
              }],
                   
              yAxes:[{
                gridLines:{
                    color:"#0984e3"
                }
              }]
                
                
            }
        }
    }); //chart

            //lineChart.data.datasets[0].data = percentRep;

        

     //clear input values
    $('#resistanceUsed').val(" ");
     $("#reps").val(" ");

    console.log(lineChart.data.datasets[0].data);

    });


    $("#output button").on("click", function(){
        lineChart.destroy();
        $(".maxRep").css("grid-template-columns","1fr");
        $("#line").css("display","none");
        $("#output").css("display","none");
        $("#formContainer").css("display","block");
    });

//show img on abbr click designate text/id with src name

    var img = $(".modal img");
    var $left = $(".fa-angle-left");
    var $right = $(".fa-angle-right");
    var $close = $(".modal span");

    //check for starting point
    function checkPoint(index){
                if(index === 2){
                    $right.css("visibility","hidden");
                    $left.css("visibility","visible");
                    
                }
                else if(index === 1){
                    $left.css("visibility","visible");
                    $right.css("visibility","visible");
                }
                else if(index === 0){
                    $left.css("visibility","hidden");
                    $right.css("visibility","visible");
                }
    }

 

    $("abbr").each(function(index){
        $(this).on("click", function(){
            $(".modal").css("display","block");
            $("header").css("display","none");
            $("#container").css("visibility","hidden");
            getImage($(this).text());
        });

        //show preview of certification on hover
        $(this).on("mouseenter",function(){
   
            var name = $(this).text();
            var img = $("#container img");
          
                if(index === 0){
                    $("#container").css("left","49%");
                    console.log("hi",index,$(this));
                }
                else if(index === 1){
                    $("#container").css("left","53%");
                    console.log("juan",index,$(this));
                }
                else if(index === 2){
                    $("#container").css("left","56%");
                    console.log("mario",index,$(this));
                }
        
            img.attr("src",name + ".JPEG");
            $("#container").css("display","block");
            $(this).on("mouseleave", function(){
            $("#container").css("display","none");
            })
        });
        
    });

    if (is_touch_device()) {
        $('footer abbr').each(function(){
            $(this).off("mouseenter");
        })
       }

    function getImage(text){
        img.each(function(index){

            function showImage(){
                img[index].style.display = "block";
                $("#square" + index).css("background-color", "#129ddd");
            }
        
            function removeImage(){
                img[index].style.display = "none";
                $("#square" + index).css("background-color", "#c2c1c1");
            }

            if($(this).attr('src').match(text)){
                $(this).css("display","block");
                $("#square" + index).css("background-color", "#129ddd");
                checkPoint(index);

                $left.on("click",function(){
                    removeImage();
                    index--;
                    checkPoint(index);
                    showImage();
                });

                $right.on("click", function(){
                    removeImage();
                    index++;
                    checkPoint(index);
                    showImage();
                });
            }
            else{
                $(this).css("display","none");
                $("#square" + index).css("background-color", "#c2c1c1");
            }
        });

        $close.on("click",function(){
            $close.off("click");
            $right.off("click");
            $left.off("click");
            $("#container").css("visibility","visible");
            $(".modal").css("display","none");
            $("header").css("display","block");
        });

    }



});

