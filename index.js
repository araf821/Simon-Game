var gamePattern = [];
var playerPattern = [];
var patternIndex = -1;

var gameLevel = 0;

var buttonColors = ["red", "blue", "green", "yellow"];

// Starting the game initially
$(document).keydown((e) => {
  if (gameLevel === 0) {
    nextSequence();
  }
});

// Button click handler
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  playerPattern.push(userChosenColor);
  patternIndex++;

  // Check if the color the player just clicked on matches the color at
  // the current index of the actual pattern.
  checkForMatch(patternIndex);

  // Play the animation of the button clicked.
  animatePress(userChosenColor);
});

function nextSequence() {
  // Emptying the user's pattern to get them ready for the next round.
  playerPattern = [];
  patternIndex = -1;

  // Changing the heading to display the current level.
  gameLevel++;
  $("#level-title").html("Level " + gameLevel);

  // Generate a random number 0 - 3.
  var randomNumber = Math.floor(Math.random() * 4);

  // Store a random color based on the random number into the gamePattern.
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Add an animation to the chosen color.
  $("#" + randomChosenColor)
    .fadeToggle(50)
    .fadeToggle(50)
    .fadeToggle(50)
    .fadeToggle(50);

  // Play the audio for the chosen color.
  playSound(randomChosenColor);
}

function checkForMatch(color, index) {
  if (playerPattern[patternIndex] === gamePattern[patternIndex])
    playSound(playerPattern[patternIndex]);
  else gameOver();

  if (patternIndex === gamePattern.length - 1) {
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");

  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 150);
}

function gameOver() {
  $("body").addClass("game-over");

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);

  playSound("wrong");
  gamePattern = [];
  gameLevel = 0;
  $("#level-title").html("Game Over! Press Any Key to Restart");
}
