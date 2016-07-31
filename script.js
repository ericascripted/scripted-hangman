var guesses = [];
var misses = 0;
var word = ['A','B','A','L','O','N','E'];

function updateWord() {
  $("#word").empty();
  for (var i = 0; i < word.length; i++) {
    var letter = word[i];
    if (guesses.includes(letter)) {
      $("#word").append(letter);
    } else {
      $("#word").append("_");
    }
  }
}

function updateHangman() {
  $("#hangman").attr("src", "Hangman-" + misses + ".png");
}

function hasWon() {
  for(var i = 0; i < word.length; i++) {
    var letter = word[i];
    if (guesses.includes(letter) === false) {
      return false;
    }
  }
  return true;
}

function hasLost() {
  if (misses < 6) {
    return false;
  } else {
    return true;
  }
}

function guessLetter(letter) {
  letter = letter.toUpperCase();

  if (guesses.includes(letter)) {
    $("#message").text("You already guessed the letter '" + letter + "'!");
    $("#message").show();
    return;
  }

  guesses.push(letter);

  if (word.includes(letter) === false) {
    misses++;
  }
}

function newGame() {
  guesses = [];
  misses = 0;
  $("#message").hide();
  $("#newgame").hide();
  updateWord();
  updateHangman();
}

$(document).ready(function() {
  newGame();

  $("#newgame").click(newGame);

  $(document).keypress(function(event) {
    $("#message").empty();
    $("#message").hide();

    guessLetter(event.key);

    updateWord();
    updateHangman();

    if (hasWon()) {
      $("#message").text("You won!");
      $("#message").show();
      $("#newgame").show();
    }
    if (hasLost()) {
      $("#message").text("You lost!");
      $("#message").show();
      $("#newgame").show();
    }
  });
});
