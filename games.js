var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

 $(document).on("keydown",function (){
   if(!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
   }
 });
 
$(".btn").on("click",function () {
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   var index = userClickedPattern.length - 1;
   checkAnswer(index);
}
);

function nextSequence() {

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

  
 function playSound(name){
    var audio = new Audio("./sounds/" + name +".mp3");
    audio.play();
 }
 function animatePress(currentcolour) {
    $("#"+ currentcolour).addClass("pressed");
    setTimeout(function(){
    $("#"+ currentcolour).removeClass("pressed");
    },100);
 }

 function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
     if(userClickedPattern.length === gamePattern.length){
      setTimeout(function (){
         nextSequence();
       },1000);
     }
   }
 if(userClickedPattern[currentLevel] != gamePattern[currentLevel]){
   var wrong = new Audio("./sounds/wrong.mp3");
   wrong.play();
   $("body").addClass("game-over");
   setTimeout(function (){
   $("body").removeClass("game-over");
   },200);
   $("#level-title").text("Game Over, Press Any Key to Restart");
   restart();
 }
 if(currentLevel === gamePattern.length - 1){
   userClickedPattern = [];
 }
 }

 function restart() {
   started = false;
   level= 0;
   gamePattern =[];
   userClickedPattern = [];
 }

 
 