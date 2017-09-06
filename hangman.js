$(document).ready(function(){
 
var Hangman = (function(){
  "use strict";
  
  var line;
  var counter = 6;
  var userInput;
  var words;
  var correct = 0;
  var context; 

  var getWords = function() {
    $.ajaxPrefilter(function(options) {
        if (options.crossDomain && $.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
      }
    });

    $.ajax({
      type: 'GET',
      url: 'https://api.datamuse.com/words?rel_jjb=happy',
      crossDomain: true,
      crossOrigin: true
    }).done(function(response){

      var word = response[Math.floor(Math.random() * response.length)].word.toUpperCase();
      words = word.split("");
      setUp(); 
      console.log(words)
    }); 
  };
  
  var setUp = function() {  
      for (var line = 0; line < words.length; line++) {
        $("#guessLetters ul").append("<li class='lines "+ line +"'></li>");
        $(".lines").html("<br>");
      }  

      $("#wordLength").html("<p>This word has " + line + " letters.</p>");
      $("#letters, #input, label, #submit, #stick, #wordLength").fadeIn();
      $("#turnsLeft").html("<p>You have " + counter + " turns left.</p>");
      guessLetters(words);
  };

  var clear = function() {
    $(".next").css("opacity", "1");
    $(".next button").addClass("blink");
    $("#submit").prop("disabled", true);
    $(".next button").prop("disabled", false);
    
    $(".next").on("click", function(){ 
        window.location.reload();
    }); 
  };


  var guessLetters = function(words) {  
    $("#input").keydown(function(e){    
      if(e.keyCode === 13){
         $("#submit").trigger("click");
      }
    });
    $("#submit").on("keypress click", function() {
      userInput = $("#input").val().toUpperCase();
      $("#input").val("");
        if ($(".letter:contains('"+userInput+"')").hasClass("incorrectly-chosen") ||
          $(".letter:contains('"+userInput+"')").hasClass("chosen-correctly")) {
        alert("already chosen");
      } else {
        var validate = function () {
            if (/^[A-Z]$/.test(userInput)){
              return true;
            } else {
              alert("Please enter a valid letter");
            }
          }
          if (userInput !== "" && validate()) {
              if (words.includes(userInput)) {
              for (var r = 0; r < words.length; r++) {
                if (userInput == words[r]) {
                  $("." + r).html(words[r]);               
                  $(".letter:contains('"+userInput+"')").addClass("chosen-correctly");
                  correct ++;
                }
              }
              if (correct == words.length) {            
                $("#turnsLeft").html("<p>Hooray! You won!</p>");
                $("#banana").fadeIn();
                clear();  
              }
            } else {
                counter --;
                $("#turnsLeft").show();
                $("#turnsLeft").html("<p>You have " + counter + " turns left.</p>");
                $(".letter:contains('"+userInput+"')").addClass("incorrectly-chosen");
                checkCount(counter);
              }
            } else {
              alert("Please enter a letter");
            }
          }
     });
  };

  var checkCount = function(counter) { 
    if (counter == 5) {
        count5();
      } else if (counter == 4) {
        count4();
      } else if (counter == 3) {
        count3();
      } else if (counter == 2) {
        count2();
      } else if (counter == 1) {
        count1();
      } else if (counter == 0) {
        clear();
        $("#wordLength").html("Aww, so close. The word was " + words.join(""));
        $("#one").hide();
        //sad face
      } 
  }
  
  var count5 = function() {
    var canvas = document.getElementById("man");
    context = canvas.getContext("2d"); 

    context.beginPath();
    context.fillStyle = "rgba(0, 0, 200, 0)";
    context.lineWidth = 2;
    context.strokeStyle = '#FFFFFF';
    context.arc(200, 50, 30, 0, Math.PI * 2, true); 
    context.fill();
    context.stroke();
      
  };

  var count4 = function() {
    context.beginPath();
    context.fillStyle = "#FFFFFF"; 
    context.arc(190, 45, 3, 0, Math.PI * 2, true); 
    context.fill();
    context.arc(210, 45, 3, 0, Math.PI * 2, true); 
    context.fill();
  }

  var count3 = function() {
    context.beginPath();
    context.moveTo(200, 80);
    context.lineTo(200, 180);
    context.strokeStyle = "#FFFFFF";
    context.stroke();

  };

  var count2 = function() {
    context.beginPath();
    context.strokeStyle = "#FFFFFF"; // blue
    context.moveTo(200, 80);
    context.lineTo(150, 130);
    context.moveTo(200, 80);
    context.lineTo(250, 130);
    context.stroke();

  };

  var count1 = function() {
    context.beginPath();
    context.strokeStyle = "#FFFFFF";
    context.moveTo(200, 180);
    context.lineTo(150, 280);
    context.moveTo(200, 180);
    context.lineTo(250, 280);
    context.stroke();

  };

  return {
    getWords: getWords
  }


}());
Hangman.getWords();
});      