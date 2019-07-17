$(document).ready(function(){

    function is_touch_device() {
        return (('ontouchstart' in window)
             || (navigator.MaxTouchPoints > 0)
             || (navigator.msMaxTouchPoints > 0));
       }
       
       if (is_touch_device()) {
      $("#hover").css("display","none");
      $("#emailMe").css("display", "block");
       }

       var $hamburger = $("#hamburger");

        $hamburger.on("click", function(){
        $(this).toggleClass("close");
        $('.wrapperNav').toggleClass("closeSide");
        });

var form = $('#ajax-contact');

//var formMessages = $('#form-messages');
    //check other option
$("select#goal").change(function(){
        var goalSelected = $("select#goal").val();
        var $days = $("#days");
        $("#workoutDays").val("");
        if(goalSelected === ""){
            $days.css("display","none");
            $("#workoutDays").prop("required",false);
        }
        else if(goalSelected != "Don't have one"){
            $days.css("display","block");
            $("#workoutDays").prop("required",true);
        }

        if(goalSelected === "other"){
            $("#other").css("display","inline")
            //get value of other input for netlify
            $("#other").prop("required",true).attr("name","other");
            
        }
        else{
            $("#other").css("display","none").prop("required",false).removeAttr("name").val("");
        }

    console.log(goalSelected);
});
    
    
$(form).on("submit",function(e){
  e.preventDefault();
 
  $.post($(form).attr("action"), $(form).serialize()).then(function() {
     alert("Thank you!");
   });


console.log("working");
});

//abbr show certs 
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
