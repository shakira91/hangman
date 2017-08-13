$(document).ready(function(){
 
var Hangman = (function(){
  "use strict";
  
  var words = ["UNI", "yasss"];
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

      guessLetters(words[game], w);

    });
 
  };

  var guessLetters = function(word, line) {

    $("#submit").on("click", function() {

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
              alert("please enter a valid letter")
            }
          }
          if (userInput !== "" && validate()) {

              if (word.includes(userInput)) {
                for (var e = 0; e < words[game].length; e++) {
                    var index = word.indexOf(userInput, e);
                    $(".letter:contains('"+userInput+"')").addClass("chosen-correctly");
                    if ($(".lines").hasClass(index)) {
                      $("." + index).html(userInput);
                      console.log(userInput)
                    } 
                  }
                  line--; console.log(line)
                  if (line == 0) {
                    alert("yay you won. Next game?")
                    $("#turnsLeft").hide();
                    // $("#start").show();
                    //   game++;
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