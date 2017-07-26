$(document).ready(function(){ 
  "use strict";

var words;
var game = 0; //this need to increase IF the person guesses the right answer beforehand.
var counter = 5;

var Hangman = function(words, game) {
 this.words = words;
 this.game = game;
}

Hangman.prototype.setUp = function() {
  $("#start").on("click", function(){
	  for (var w = 0; w < words[game].length; w++) { 
	    $("#guessLetters ul").append("<li class='lines "+ w +"'></li>");
	  }
    $("<div id='wordLength'>This word has " + w + " letters.</div>").insertAfter("#guessLetters");
    $("#letters, #input, label, #submit").show();
    $("#start").hide();
    newGame.guessLetters(words[game]);
  });
}

Hangman.prototype.guessLetters = function(word) {
	$("#submit").on("click", function() {
		var userInput = $("#input").val();
		var index = word.indexOf(userInput);
		if (word.includes(userInput)) {
			$(".letter:contains('"+userInput+"')").css( "opacity", "0.5" );

			if ($(".lines").hasClass(index)) {
				console.log(index)
				$("." + index).html(userInput)
			}	
		} else {
			$("#turnsLeft").html("<p>You have " + counter + " turns left.</p>");
			counter --;
		}
	});

 //
}

var newGame = new Hangman(words = ["HIAS", "refugees", "burundi", "congolese"], game);

newGame.setUp();

});