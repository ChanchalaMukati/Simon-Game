var colours = ["yellow","green","blue","red"];

var gamePattern = [];
var userClickedPattern = [];
var level=0;
var points=0;
var flag= false;


$(document).keydown(startGame);

function startGame(){
    if(!flag){
        $("#level-title").text("Level-"+level);
        nextSequence();
        flag=true;
        $("#coins").text(points);
        $(document).off("keydown", startGame);
    } 

}

$("#reset").click(function() {
    $("body").addClass("reset-over");
    startOver();

    setTimeout(function() {
        $("body").removeClass("reset-over");
        startGame();
    },800);
});


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currLevel){

    if(gamePattern[currLevel] === userClickedPattern[currLevel]) {
        if (userClickedPattern.length === gamePattern.length){
        console.log("success");
        points++;
        $("#coins").text(points);
        setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    }else{
        playSound("wrong");
        console.log("failed");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function nextSequence() {
userClickedPattern = [];
level++;
$("#level-title").text("Level " + level);

var randomNum = Math.floor(Math.random()*4); 
var randomChosenColour= colours[randomNum];
gamePattern.push(randomChosenColour);
console.log(gamePattern);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

function playSound(name){
var audio= new Audio("sounds/"+name+".mp3");
audio.play();
}

function animatePress(userChosenColor){
    $("#"+userChosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+userChosenColor).removeClass("pressed");
}, 100);
}



function startOver() {
    level=0;
    gamePattern = [];
    flag= false;
    points=0;
    // $("#coins").text(points);
    $(document).on("keydown", startGame);
}