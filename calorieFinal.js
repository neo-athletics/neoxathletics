$(document).ready(function(){
    var sedetary  = [.58,.12,.30];
    var physically = [.60,.15,.25];
    var moderate = [.60,.20,.20];
    var active = [.55,.25,.20];
    var vigorous = [.55,.30,.15];
    var $activity = ["sedetary", "physically", "moderate", "active", "vigorous"];
    var $cal = $('#cal');
    var types= [sedetary,physically,moderate,active,vigorous];
    var $weightSelector = $('input[name = "weight"]');
    var $height = $('input[name = "height"]');
    var $age = $('input[name = "age"]');
    var weight = null;
    var load = 0;
    var dis;
    var $fat = $('input[name = "fats"]');
    var $carbs = $('input[name = "carbs"]');
    var $protein = $('input[name = "protein"]');
    var tempCal;
    var chart;
    var ctx = $("#pie");
    var see;

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

    //pie chart
function bar(number) {


    var chartValue = {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ["carbohydrates", "protein", "fats"],
            datasets: [{
                label: "Total calories",
                backgroundColor: ['rgb(0, 99, 132)',
                    'rgb(10,133,122)',
                    'rgb(22,34,100)'
                ],
                borderColor: 'rgb(255, 99, 132)',
                data: number //once decide function is finish put it in here in place of old value
            }]
        },

        // Configuration options go here
        options: {}
    };
return chartValue;

}


    //displaying current percentage
    function displayBig(){
        $fat.val('') ;
        $carbs.val('');
        $protein.val('');
        //try to set up the values  empty at submit
        var $fatCurrent = 0,$proteinCurrent = 0,$carbsCurrent = 0;

        var total = 100;
        //$fat.on("focus", function(){

        $fat.on("change",function(){
            if($(this).val() == ""){
                $fatCurrent = 0;
                total = $carbsCurrent + $proteinCurrent + $fatCurrent;
                console.log('one');
            }
            else{
                $fatCurrent = $(this).val();
                console.log($fatCurrent,$carbsCurrent,$proteinCurrent,total);
            }
            total = parseInt($fatCurrent) + parseInt($proteinCurrent) + parseInt($carbsCurrent);
            console.log(total);
            if(total > 100){
                $(".display").html("you are over " + (total -100) + "%");
                $('#submit').prop("disabled", true);
            }
            else if ((total < 100 && total > 0) || ((total == 0) && (($fat.val() !== 0)&&($protein.val() !== 0)&&($carbs.val() !== 0)))){
                $(".display").html((100-total) + "% remaining");
                $('#submit').prop("disabled", true);
                console.log(total);
                console.log($fat.val(), $carbs.val(), $protein.val());
                console.log($fatCurrent, $carbsCurrent, $proteinCurrent);
            }
            else if((total === 100)){
                $(".display").html("complete");
                $('#submit').prop("disabled", false);
                total = 0;
                console.log(total);


            }
            else if((total === 0) && ((($fat.val() == '')&&($protein.val() == '')&&($carbs.val() == '')) || (($fat.val() == '0')&&($protein.val() == '0')&&($carbs.val() == '0')) ) && (($fatCurrent === 0)&&($proteinCurrent === 0)&&($carbsCurrent === 0))){
                $("#macros").css({"visibility":"hidden"});
                $(".edit").css({"visibility":"visible"});
                //$(".display").css({"visibility":"hidden"});
                $('#submit').prop("disabled", false);
                $(".display").html("you will use the default macro values");
                console.log(total);

            }
            console.log($carbsCurrent, $proteinCurrent, $fatCurrent);

        });


        //});

        //$protein.on("focus", function(){

        $protein.on("change",function(){

            if($(this).val() == ""){
                $proteinCurrent = 0;
                total = $carbsCurrent + $proteinCurrent + $fatCurrent;
            }
            else{
                $proteinCurrent = $(this).val();
            }

            total =  parseInt($fatCurrent) + parseInt($proteinCurrent) + parseInt($carbsCurrent);
            if(total > 100){
                $(".display").html("you are over " + (total -100) + "%");
                $('#submit').prop("disabled", true);
            }
            else if((total < 100 && total > 0) || ((total == 0) && (($fat.val() !== 0)&&($protein.val() !== 0)&&($carbs.val() !== 0)))){
                $(".display").html((100-total) + "% remaining");
                $('#submit').prop("disabled", true);
                console.log(total);
            }
            else if((total === 100)){
                $(".display").html("complete");
                $('#submit').prop("disabled", false);
                console.log(total);
                total = 0;

            }
            else if((total === 0) && ((($fat.val() == '')&&($protein.val() == '')&&($carbs.val() == '')) || (($fat.val() == '0')&&($protein.val() == '0')&&($carbs.val() == '0')) )){
                $("#macros").css({"visibility":"hidden"});
                $(".edit").css({"visibility":"visible"});
                //$(".display").css({"visibility":"hidden"});
                $('#submit').prop("disabled", false);
                $(".display").html("you will use the default macro values");
                console.log(total);
            }

        });

        //});
        // $carbs.on("focus", function(){

        $carbs.on("change",function(){
            if($(this).val() == ""){
                $carbsCurrent = 0;
                total = $carbsCurrent + $proteinCurrent + $fatCurrent;
            }
            else{
                $carbsCurrent = $(this).val();
            }

            total =  parseInt($fatCurrent) + parseInt($proteinCurrent) + parseInt($carbsCurrent);
            if(total > 100){
                $(".display").html("you are over " + (total -100) + "%");
                $('#submit').prop("disabled", true);
            }
            else if ((total < 100 && total > 0) || ((total == 0) && (($fat.val() !== 0)&&($protein.val() !== 0)&&($carbs.val() !== 0)))){
                $(".display").html((100-total) + "% remaining");
                $('#submit').prop("disabled", true);
                console.log(total);
            }
            else if((total === 100)){
                $(".display").html("complete");
                $('#submit').prop("disabled", false);
                console.log(total);
                total = 0;
            }
            else if((total === 0) && ((($fat.val() == '')&&($protein.val() == '')&&($(this).val() == '')) || (($fat.val() == '0')&&($protein.val() == '0')&&($(this).val() == '0')) )){
                $("#macros").css({"visibility":"hidden"});
                $(".edit").css({"visibility":"visible"});
                //$(".display").css({"visibility":"hidden"});
                $('#submit').prop("disabled", false);
                $(".display").html("you will use the default macro values");
                console.log(total);
            }

        });

        //});
        console.log(total);



        // $(".display").html(total + "% remaining");

    }
    //editing macros

    $('.edit').on("click", function () {
        displayBig();
        $('.goals').css('display','none');
        $("#macros").css({"display": "inline-block"});
        //$("#submit").attr("value", "update");
        $(this).css( "display","none");
        $(".display").html('').css({"visibility":"visible"});
        $('.cancel').css("visibility",'visible');

      

        $('.cancel').on("click", function(){
            $('.goals').css('display','block');
            $('#macros').css("display","none");
            $(this).css("visibility","hidden");
            $('.edit').css( "display","inline-block");
            $(".display").html('').css({"visibility":"visible"});
            $('#submit').prop("disabled", false);
           
        });

    });


    //function to calculate grams for macros
    function calculations(kcalories, $temp) {
        var cal;
        var caloriesPerPercentage = [];
        var grams = [];
        for (var i = 0; i < $temp.length; i++) {
            cal = 0;
            cal = kcalories * $temp[i];
            caloriesPerPercentage.push(cal);
            console.log(caloriesPerPercentage.length-1);

        }
        console.log(caloriesPerPercentage.length-1);

        var j = 0 ;
        while(j < caloriesPerPercentage.length-1){
            grams.push(Math.round(caloriesPerPercentage[j]/4));
            j++;
            console.log(caloriesPerPercentage[j]);
            console.log(caloriesPerPercentage[j]/4);

            if(j === caloriesPerPercentage.length-1){
                console.log("fat");
                grams.push(Math.round(caloriesPerPercentage[j]/9));
            }
        }

        console.log(caloriesPerPercentage);// calories based on percentage
        //console.log(calories);
        console.log(grams);//grams per macro

        return grams;
    }

 
    
    
    
    //form being submitted

        $cal.on('submit', function(e){
            e.preventDefault();





        var lifeStyle = $( "#drop option:selected" ).val();
       // var weight = $('input:text').val();

        if ($("input[name='weightType']:checked").val() === "lbs"){
            /*don't overwrite input selector*/
            weight = $weightSelector.val() / 2.2;
            console.log($("input[name='weightType']:checked").val());
        }
        else{
            weight = $weightSelector.val();
            console.log($("input[name='weightType']:checked").val());
        }
        console.log(weight);
/*
        function calories(){
            var weight= 10 * $weight;
            var height = 6.25 * $height.val();
            var age = 5* $age.val();
            var body = weight + height;
            var preCal = body - age;

            return preCal;
        }
*/
            if($("input[name='gender']:checked").val() === "male"){
                console.log("male");

                function caloriesMale(){
                /*
                   var weight = $weight * 6.23;
                   console.log(weight);
                    var height = $height.val() * 12.7;
                console.log(height);
                    var body = weight + height;
                console.log(body);
                    var ageProduct = $age.val() * 6.8;
                console.log(ageProduct);
                    var remainder = body - ageProduct;
                console.log(remainder);
                    var basalMetabolicRate = remainder + 66;
                */

                /*

                var basalMetabolicRate = calories() + 5;

                    return basalMetabolicRate;

                    */

                var bmr = 66 + (13.75 * weight) + (5*$height.val()) - (6.8 * $age.val());
                return bmr;
                }
                console.log(caloriesMale());

            }
            else if($("input[name='gender']:checked").val() === "female"){
                console.log("female");

                function caloriesFemale(){
                /*
                    var weight = $weight * 4.35;
                    console.log(weight);
                    var height = $height.val() * 4.7;
                    console.log(height);
                    var body = weight + height;
                    console.log(body);
                    var ageProduct = $age.val() * 4.7;
                    console.log(ageProduct);
                    var remainder = body - ageProduct;
                    console.log(remainder);
                    var basalMetabolicRate = remainder + 655;
                */

                /*
                    var basalMetabolicRate = calories() - 161;

                    return basalMetabolicRate;
                    */

                var bmr = 655 + (9.6 * weight) + (1.8 * $height.val()) - (4.7 * $age.val());
                return bmr;
                }
                console.log(caloriesFemale());

            }

            var harris = 0;

        $activity.forEach(function(index){
             if(index === lifeStyle){
                 if($("input[name='gender']:checked").val() === "male") {
                     switch (index) {
                         case "sedetary":
                             harris = caloriesMale() * 1.1;
                             break;
                         case "physically":
                             harris = caloriesMale() * 1.2;
                             break;
                         case "moderate":
                             harris = caloriesMale() * 1.35;
                             break;
                         case "active":
                             harris = caloriesMale() * 1.45;
                             break;
                         case "vigorous":
                             harris = caloriesMale() * 1.7;
                             break;
                     }
                 }

                 else if($("input[name='gender']:checked").val() === "female") {
                     switch (index) {
                         case "sedetary":
                             harris = caloriesFemale() * 1.1;
                             break;
                         case "physically":
                             harris = caloriesFemale() * 1.2;
                             break;
                         case "moderate":
                             harris = caloriesFemale() * 1.35;
                             break;
                         case "active":
                             harris = caloriesFemale() * 1.45;
                             break;
                         case "vigorous":
                             harris = caloriesFemale() * 1.7;
                             break;
                     }
                 }

                 console.log(harris); //TDEE

                 //got the TDEE


                 var kCal = 0;
                 var grams = [];
                 var calories =[];
                 //var percent = 0;
                 var $temp = [];

                     for (var i = 0; i < types.length; i++) {
                             if (lifeStyle === $activity[i]) {
                                 for (var j = 0; j < types[i].length; j++) {
                                     console.log(types[i][j]);// types[i][j] is the percent index
                                     kCal += types[i][j] * harris; // put the percentages of macros into calories
                                     //percent += types[i][j];
                                     console.log(kCal);

                                     calories.push(types[i][j] * harris); //get the percent of macro in calories into array
                                 }
                                 $temp = types[i];
                             }
                     }
                    // console.log(percent);// total percent of macros, protein and carbohydrates
                     console.log(calories); //array of calories per macro, fat included
                     console.log(kCal); //calories before fat
                     console.log($temp); //percentage of grams of fat in array

                 kCal = Math.round(kCal);
dis = kCal;
tempCal = kCal;
                 console.log(grams);



                 //new calculations
                    //for chosen goal
                    function ooh(){
        var fat = parseInt($fat.val());
        var protein = parseInt($protein.val());
        var carbs = parseInt($carbs.val());
        var arr = [carbs,protein,fat];
        return arr;
    }
                 
       
 console.log(isNaN(ooh()[1]));//checks to see if there is a value in the custom array
                 console.log(ooh());
                 //get context
                 var yes = ooh();
                 
                 
   function validation(old) {
        //going need to get val of parameters variables ex.$protein
                var $macros = yes;//[$carbs, $protein, $fat];
                console.log($fat,$protein,$carbs,"here");
                console.log($macros);
                //validating inputs for custom macros
                console.log(yes);
                var arr = [];
        
                if (isNaN(yes[1])) {
                    //use current macros
                    console.log(isNaN(yes[1]));
                    console.log("old");
                    return old;
        
                }
                else {
                    console.log(isNaN(yes[1]));
                    //var big = 0;
                    for (var i = 0; i < $macros.length; i++) {
                          
                            arr.push((parseInt($macros[i]) * .01));
                            console.log($macros[i]);
                      
                        console.log("new");
                    }
        
                    return arr;
        
                }
        
            }
                var get;
                 
                if(((isNaN(yes[1])) && (!chart))){
                  console.log(chart);
                  console.log("orginal")
                    get = bar(calculations(kCal,$temp));
                    see = $temp;
                    chart = new Chart(ctx, get);
                     }
                else{
                    chart.destroy();
                    get = bar(calculations(kCal, validation($temp)));
                    see = validation($temp);
                    chart = new Chart(ctx, get);
                   
                }
                 
                 
                 
                    //evaluate for any zeros in custom macros

                         
              var filteredYes = yes.filter(function(value,index,arr){
                return value > 0;
            });
             
           
             if(filteredYes.length < 3){
                 //calculations and validations
                 see = validation($temp);
                 var withZeros = calculations(kCal,see);
                 var indexHolder = [];
                var yesHolder = [];
             for(var i = 0; i < withZeros.length; i++){
                 var holder = withZeros[i];
                if(holder === 0){
                    indexHolder.push(i);
                 //chart.data.labels.splice(i,1);//needs a holder as well
                 //chart.data.labels.splice(i,1);//needs a holder as well
                }
                 else{
                   
                     console.log(indexHolder + " not " + holder);
                     yesHolder.push(holder);
                    
                 }
            }
                 
                 for(var z = 0;z < indexHolder.length;z++){
                if(((chart.data.labels.length === 2)&&(withZeros.length === 2))){
                       console.log("mmmmmmmm");
                        switch(indexHolder[z-1]){
                               case 0:
                                chart.data.labels.shift();
                                 withZeros.shift();
                                chart.data.datasets[0].backgroundColor.shift();
                                break;
                               case 1:
                                chart.data.labels.pop();
                                 withZeros.pop();
                                chart.data.datasets[0].backgroundColor.pop();
                               }
                }
               else if(((chart.data.labels.length === 3)&&(withZeros.length === 3))){
                        console.log("works yes");
                        switch(indexHolder[z]){
                            case 0:
                                chart.data.labels.shift();
                                 withZeros.shift();//withzerosArray
                                chart.data.datasets[0].backgroundColor.shift();
                                break;
                            case 1:
                                chart.data.labels.splice(1,1);
                                 withZeros.splice(1,1);
                                chart.data.datasets[0].backgroundColor.splice(1,1);
                                break;
                            case 2:
                                chart.data.labels.pop();
                                 withZeros.pop();
                                chart.data.datasets[0].backgroundColor.pop();
                               }
                   }
      
                 }
 
               console.log(withZeros);
                 chart.data.datasets[0].data = withZeros//create new calulations
                 chart.update();
             }
             else{//go with original custom values if there arent any zeros in custom values
            chart.data.datasets[0].data = calculations(kCal,see);
            chart.render({
                duration: 800,
                lazy: false,
                easing: 'easeOutBounce'
            });
             }
                 
                 
              
               //almost there the custom chart works
              //might have to check chart objct
               //chart is undefined whem it is not initialized 
                       //create chart instance in here
                     //decide to go with default macro or custom, problem may arise
                    
                     //right here paste it



             }


            });

      
            display(dis);


            $('.goals').css("display","block");
            $("#macros").css({"display":"none"});
            $('.cancel').css("visibility","hidden");
            $('.edit').css( "display","inline-block");

//reset values

$fat.val('');
$protein.val('');
$carbs.val('');

$("input[name = 'deficit']").prop("checked",false);
$("input[name = 'surplus']").prop("checked",false);
$("input[name = 'goal']").prop("checked",false);

//end of submit
    });
      function display(dis) {

            $(".display").append().html("Your estimated caloric intake is " + dis + " calories per day");
            console.log(dis);
        }


                 //deficit and surplus
                //get values for chart to work

                
               var fatClone2 = 0, carbClone2 = 0, proteinClone2 = 0;
               
                 $('.pounds input').on("click",function(){
            
                    var $lbs = 0;
                   
              
                     $lbs = parseInt($(this).val());
                     load++;
                     //calculations based on goal chosen
                     var product = 0;
                     var ncal = tempCal;
                      product = $lbs * 500;
             
                     if(chart.data.labels.length < 3){
                        ncal += product;
                      for(var i=0;i<chart.data.labels.length;i++){
                          
                          var howMuch = 0;
                          howMuch = product/chart.data.labels.length;
        
                            
                          switch(chart.data.labels[i]){
                              case "carbohydrates":

                              howMuch = howMuch/4;
            

                              if(carbClone2 != '0'){
                                chart.data.datasets[0].data[i] = carbClone2;
                              
                            }

                            var carb = chart.data.datasets[0].data[i];
                     
                            var carbClone = JSON.parse(JSON.stringify(carb)); 
                    
                            chart.data.datasets[0].data[i] = carbClone + howMuch;
                 
                            carbClone2  = carbClone;  

                              break;

                              case "protein":
            
                              howMuch = howMuch/4;
                         

                              if(proteinClone2 != '0'){
                                chart.data.datasets[0].data[i] = proteinClone2;
                   
                            }                           
                              var protein = chart.data.datasets[0].data[i];
                                
                            var proteinClone = JSON.parse(JSON.stringify(protein)); 
         
                            chart.data.datasets[0].data[i] = proteinClone + howMuch;
         
                            proteinClone2  = proteinClone;  
                            
                              break;

                              case "fats":
                          
                              howMuch = howMuch/9;                            
                        

                              if(fatClone2 != '0'){
                                  chart.data.datasets[0].data[i] = fatClone2;
                                
                              }                           
                                var fat = chart.data.datasets[0].data[i];
                                      
                              var fatClone = JSON.parse(JSON.stringify(fat)); 
             
                              chart.data.datasets[0].data[i] = fatClone + howMuch;

                              fatClone2  = fatClone;  

                              break;
                          }
                      }
            
                        chart.clear();
                        chart.update();
                        
                    }
                    else if(chart.data.labels.length === 3){

                        ncal += product;
                        var newCalories = calculations(ncal,see);
  
                          chart.clear();
                          chart.data.datasets[0].data = newCalories;
                          chart.update();
                    }

                      dis = ncal;// the cal will differentiate what values will show base on calories chosen
                     display(dis);

                     //make edit button appear
                if(load > 0)
                {
                    $(".edit").css({"visibility":"visible"});
                    $('.edit').prop("disabled", false);
                }

                 });

             
                 

//selecting equilibrium

//check value isntant of chart

                 $($('input[value = "equilibrium"]')).on("click",function(){
                    load++;
                     display(tempCal);
                    //chart.clear();
                    //get = calculations(tempCal,see);
                    console.log(chart.data.datasets[0].data); // grams,sets array based on value before being changed going to be checking dividing values go through labels to check what macro it is and check length of array
                    //do if statement based on array count
                    //console.log(get);
                    console.log(see,tempCal); //percentages and total Kcal
                    //tempCal has maintenance calories
                    //might have to this ways

                    for(var i = 0; i < see.length; i++){
                        console.log(see);
                        /*
                        switch(see[i]){
                          case 0 :  
                          see.splice(i,1);
                          console.log(see);
                          break;
                        }
                        */
                       if(see[i] === 0){
                        see.splice(i,1);
                       }    
                        
                    }
                    
                    if(chart.data.labels.length < 3){

                        for(var i=0;i<chart.data.labels.length;i++){
                            switch(chart.data.labels[i]){
                                case "carbohydrates":
                                var equilibriumCarb = ((see[i] * tempCal)/4);
                                chart.data.datasets[0].data[i] = equilibriumCarb;
                                console.log(equilibriumCarb,equilibriumFat,equilibriumProtein);
                                break;

                                case "protein":
                                var equilibriumProtein = ((see[i] * tempCal)/4);
                                chart.data.datasets[0].data[i] = equilibriumProtein;
                                console.log(equilibriumCarb,equilibriumFat,equilibriumProtein);
                                break;

                                case "fats":
                                var equilibriumFat = ((see[i] * tempCal)/9);

                                console.log(equilibriumFat, see[i], i);
                                chart.data.datasets[0].data[i] = equilibriumFat;
                                console.log(equilibriumCarb,equilibriumFat,equilibriumProtein);
                                break;
                               
                            }
                        }
                    }
                    else if(chart.data.labels.length === 3){

                        
                        var newCalories = calculations(tempCal,see);
                        console.log(newCalories,see,tempCal);
                          chart.clear();
                          chart.data.datasets[0].data = newCalories;
                          chart.update();
                    }


                     //chart = new Chart(ctx, bar(get));
                    // chart.data.datasets[0].data = get;
                     chart.update();

                     //make edit button appear

                     if(load > 0)
                     {
                         $(".edit").css({"visibility":"visible"});
                         $('.edit').prop("disabled", false);
                     }



                 });
    //$('.edit').prop("disabled", true);



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



$("footer abbr").each(function(index){
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

//check for weight goal
var $goal = $("input[name = 'goal']");

$goal.each(function(){
    $(this).on("click",function(){
         if($(this).prop("checked") === true){
        console.log($(this).val());

        switch ($(this).val()){
            case "deficit":
            $("input[name = 'surplus']").prop("checked",false);
            $("input[name = 'surplus']").prop("disabled",true);
            $("input[name = 'deficit']").prop("disabled",false);
            $(".left .pounds").css("transform", "scale(1,1)");
            $(".right .pounds").css("transform", "scale(0,1)");
            $(".left").addClass("signLeft");   
            $(".right").removeClass("signRight");
            break;
            case "equilibrium":
            $("input[name = 'deficit']").prop("checked",false);
            $("input[name = 'surplus']").prop("checked",false);
            $("input[name = 'deficit']").prop("disabled",true);
            $("input[name = 'surplus']").prop("disabled",true);
            $(".right .pounds").css("transform", "scale(0,1)");
            $(".left .pounds").css("transform", "scale(0,1)");
            $(".left").removeClass("signLeft");
            $(".right").removeClass("signRight");
            console.log($(this).prop("checked"));
            break;
            case "surplus":
            $("input[name = 'deficit']").prop("checked",false);
            $("input[name = 'deficit']").prop("disabled",true);
            $("input[name = 'surplus']").prop("disabled",false);
            $(".right .pounds").css("transform", "scale(1,1)");
            $(".left .pounds").css("transform", "scale(0,1)");
            $(".right").addClass("signRight");
            $(".left").removeClass("signLeft");
            break;
            default:
            console.log("not working");

        }
    }
    });
   
});

$("#flipCard li").on("click", function(){
    console.log($(this).css(["transform","-webkit-transform"]));
    if(($(this).css("transform") === "none") && ($(this).css("-webkit-transform") === "none")){
        $(this).css({"transform":"rotateY(-180deg)","-webkit-transform":"rotateY(-180deg)"});
    }
    else{
         $(this).css({"transform":"none","-webkit-transform":"none"});
    }
   
    
})


});

