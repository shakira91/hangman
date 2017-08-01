$(document).ready(function(){
 
var Hangman = (function(){
  "use strict";
  
  var words = ["UNICORNYYYREWW"];
  var game = 0; //this need to increase IF the person guesses the right answer beforehand.
  var counter = 6;
  var userInput;


  var begin = function() {

    $("#start").on("click", function(){
      for (var w = 0; w < words[game].length; w++) {
        $("#guessLetters ul").append("<li class='lines "+ w +"'></li>");
      }   
      $("<div id='wordLength'>This word has " + w + " letters.</div>").insertAfter("#guessLetters");
      $("#letters, #input, label, #submit, #stick").show();
      $("#start").hide();
    });

      guessLetters(words[game]);
 
  };

  var guessLetters = function(word) {

    $("#submit").on("click", function() {

      userInput = $("#input").val().toUpperCase();
      $("#input").val("");

      var validate = function () {
        if (/^[A-Z]$/.test(userInput)){
          return true;
        } else {
          alert("please enter a valid letter")
        }
      }

      if (userInput && validate) {
          
          for (var e = 0; e < words[game].length; e++) {
              var index = word.indexOf(userInput, e);
      
              if (word.includes(userInput)) {
                $(".letter:contains('"+userInput+"')").css( "opacity", "0.5" );
                if ($(".lines").hasClass(index)) {
                  $("." + index).html(userInput);
                }
              } else {
                $("#turnsLeft").show();
                $("#turnsLeft").html("<p>You have " + counter + " turns left.</p>");
                counter --;
                checkCount(counter);
              }
          }
      } else {
        alert("please enter a letter");
      }
    });

  };

  var checkCount = function(counter) {
    if (counter == 5) {
      alert("draw the head")
    } else if (counter == 4) {
      alert("draw the body")
    } else if (counter == 3) {
      alert("draw the right arm")
    } else if (counter == 2) {
      alert("draw the left arm")
    } else if (counter == 1) {
      alert("draw the right leg")
    } else if (counter == 0) {
      alert("draw the left leg")
    } else {
      alert("awww RIP")
      $("#turnsLeft").hide();
    }

  };

  return {
    begin: begin
  }


}());
Hangman.begin();
});