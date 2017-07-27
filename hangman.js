$(document).ready(function(){ 
 
var Hangman = (function(){
  "use strict";
   
  var words = ["HIAS", "refugees", "burundi", "congolese"];
  var game = 0; //this need to increase IF the person guesses the right answer beforehand.
  var counter = 5;

  var begin = function() {

    $("#start").on("click", function(){
      for (var w = 0; w < words[game].length; w++) { 
        $("#guessLetters ul").append("<li class='lines "+ w +"'></li>");
      }
      $("<div id='wordLength'>This word has " + w + " letters.</div>").insertAfter("#guessLetters");
      $("#letters, #input, label, #submit, #stick").show();
      $("#start").hide();
    });

    return {
      guess: guessLetters(words[game]), 
      draw: draw(words[game]) //this needs to be called EACH time a user guesses wrong
    }
  }

  var guessLetters = function(word) {
    $("#submit").on("click", function() {
      var userInput = $("#input").val();
      var index = word.indexOf(userInput);
      if (word.includes(userInput)) {
        $(".letter:contains('"+userInput+"')").css( "opacity", "0.5" );

        if ($(".lines").hasClass(index)) {
          $("." + index).html(userInput)
        } 
      } else {
        $("#turnsLeft").html("<p>You have " + counter + " turns left.</p>");
        counter --;
      }
    });

  }

  var draw = function(stuff) {
    alert("draw the head");

  }

  return {
    begin: begin
  }


}());
Hangman.begin();

});