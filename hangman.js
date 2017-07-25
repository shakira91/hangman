"use strict";

var words;
var game = 0;

var hangman = function() {
 this.words = words;
 this.game = game;
}

hangman.prototype.setUp = function(words, game) {
 for (var w = 0; w < words[game].length; w++) { 
 	console.log(words[game][w])
 	$("#guessLetters ul").append("<li class='lines'></li>");
  }
  game++;
}

var newGame = new hangman();

newGame.setUp(words = ["pizza", "corn", "cake", "lovefgd"], game);