$(document).ready(function(){
 
var Hangman = (function(){
  "use strict";
  
  var words = ["UNI", "yasss", "pooooooooop"];
  var game = 0; //this need to increase IF the person guesses the right answer beforehand.
  var line = null;
  var counter = 6;
  var userInput;

  var begin = function() {
    console.log(words[game])
    $(".next").on("click", function(){
      $("#submit").prop("disabled", false);
      $(".next button").prop("disabled", true);
      $(".incorrectly-chosen").removeClass("incorrectly-chosen");
      $(".chosen-correctly").removeClass("chosen-correctly");

      counter = 6;
      $(".next button").removeClass("blink");
      $(".lines").remove();

      for (var line = 0; line < words[game].length; line++) {
        $("#guessLetters ul").append("<li class='lines "+ line +"'></li>");
        $(".lines").html("<br>");
      }  

      $("#wordLength").html("<p>This word has " + line + " letters.</p>");
      $("#letters, #input, label, #submit, #stick, #wordLength").fadeIn();
      $(".first").hide();
      $("#turnsLeft").html("<p>You have " + counter + " turns left.</p>");
      
      guessLetters(words[game], line); 

    });
 
  };

  var guessLetters = function(word, line) {
    console.log(word)
    $("#submit").on("click", function() {
      userInput = $("#input").val().toUpperCase();
      console.log(word.includes(userInput))
      
      console.log(line)
      console.log(game)
      $("#input").val("");
      if ($(".letter:contains('"+userInput+"')").hasClass("incorrectly-chosen") ||
          $(".letter:contains('"+userInput+"')").hasClass("chosen-correctly")) {
        alert("already chosen");
      } else {
        var validate = function () {
            if (/^[A-Z]$/.test(userInput)){
              return true;
            } else {
              alert("please enter a valid letter")
            }
          }
          if (userInput !== "" && validate()) {

              if (word.includes(userInput)) {
                alert("yas")
                for (var e = 0; e < words[game].length; e++) {
                    var index = word.indexOf(userInput, e);
                    $(".letter:contains('"+userInput+"')").addClass("chosen-correctly");
                    if ($(".lines").hasClass(index)) {
                      $("." + index).html(userInput);
                    } 
                  }
                  line--;
                  if (line == 0) {
                    alert("yay you won. Next game?")
                    $(".next").css("opacity", "1");
                    $(".next button").addClass("blink");
                    $("#submit").prop("disabled", true);
                    $(".next button").prop("disabled", false);
game++;
                      
                      $(".next").on("click", function(){
                        
                        begin(); 
                        $("#turnsLeft").fadeIn();
                      });
                      
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
        drawHead();
      } else if (counter == 4) {
        drawTheRest();
        alert("draw the body")
      } else if (counter == 3) {
        alert("draw the right arm")
      } else if (counter == 2) {
        alert("draw the left arm")
      } else if (counter == 1) {
        alert("draw the right leg")
      } else if (counter == 0) {
        alert("awww RIP")
        $("#turnsLeft").hide();
      } 
  }
  
  var drawTheRest = function() {
    var c = document.getElementById("rest");
    var ctx = c.getContext("2d");
    ctx.moveTo(100,0);
    ctx.lineTo(100,100);
    ctx.stroke();
  };

  var drawHead = function() {
    var c = document.getElementById("head");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
  };

  return {
    begin: begin
  }


}());
Hangman.begin();
});      