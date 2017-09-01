$(document).ready(function(){
 
var Hangman = (function(){
  "use strict";
  
  var line;
  var counter = 6;
  var userInput;
  var words;

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

      words = response[Math.floor(Math.random() * response.length)].word.toUpperCase();
      
      setUp(); 

    }); 
  };
  
  var setUp = function() {  
      for (var line = 0; line < words.length; line++) {
        $("#guessLetters ul").append("<li class='lines "+ line +"'></li>");
        $(".lines").html("<br>");
      }  

      $("#wordLength").html("<p>This word has " + line + " letters.</p>");
      $("#letters, #input, label, #submit, #stick, #wordLength").fadeIn();
      $(".first").hide();
      $("#turnsLeft").html("<p>You have " + counter + " turns left.</p>");
      guessLetters(words, line);
  };

  var next = function() {
    $(".next").css("opacity", "1");
    $(".next button").addClass("blink");
    $("#submit").prop("disabled", true);
    $(".next button").prop("disabled", false);
    
    $(".next").on("click", function(){ 
        window.location.reload();
    }); 
  };


  var guessLetters = function(words, line) {   
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

              if (words.includes(userInput)) {
                for (var e = 0; e < words.length; e++) {
                    var index = words.indexOf(userInput, e);
                    $(".letter:contains('"+userInput+"')").addClass("chosen-correctly");
                    if ($(".lines").hasClass(index)) {
                      $("." + index).html(userInput);
                    } 
                  }
                  line--;
                  if (line == 0) {
                      next();       
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
        next();
        //sad face
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
    getWords: getWords
  }


}());
Hangman.getWords();
});      