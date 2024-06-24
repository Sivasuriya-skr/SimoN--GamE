const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started=true;
    }
})

$(".btn").click(function() {
    const userChosenColor=$(this).attr("id");
 
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor)
    animatePress(userChosenColor);
   
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('success');
        if (userClickedPattern.length === gamePattern.length){
           setTimeout(function() {
               nextSequence();
           }, 1000);
       } 
    } else {
        console.log('wrong');
        var audio = new Audio("sounds/wrong.mp3")
        audio.play();
        $("body").addClass("game-over")
        setTimeout (function() {
            $("body").removeClass("game-over");
        }, 100)
        $("#level-title").text("Game Over, Press Any Key to Restart ");
        startOver();
       
    }
};

function nextSequence() {
    userClickedPattern = [];
   
    level++;
    $("#level-title").text("Level " + level);

    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play(); 
}

function animatePress(currentColor) {
    $('#'+currentColor).addClass("pressed"); 
    setTimeout(function() {
        $('#'+currentColor).removeClass("pressed");
    }, 100);
   

function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }
  }
