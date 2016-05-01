var pomMinutes = document.getElementById("pomMinutes");
var minutes = pomMinutes.innerText;
var seconds = 0;
var breakMinutes = document.getElementById("breakMinutes");
breakTime = breakMinutes.innerText;
var intervalID;
var running = false;
var onBreak = false;


//sounds
var canvasClick = new Audio("http://www.oringz.com/oringz-uploads/sounds-1049-knob.mp3");
var timerChimer = new Audio("http://www.oringz.com/oringz-uploads/2f_oringz-pack-nine-19.mp3");


//start and stop timer when canvas is clicked
document.getElementById("timerCanvas").addEventListener("click",function(){
  canvasClick.play();
  if (running){
    stopCounter();
  } else if (!running){
    runCounter();
  }
});


//these listeners adjust their respective values
document.getElementById("pomDown").addEventListener("click",function(){
  stopCounter();
  if (pomMinutes.innerText > 1){
    pomMinutes.innerText -= 1;
  }
  reset();
});

document.getElementById("pomUp").addEventListener("click",function(){
  stopCounter();
  pomMinutes.innerHTML = parseInt(pomMinutes.innerHTML) + 1;
  reset();
});

document.getElementById("breakDown").addEventListener("click",function(){
  stopCounter();
  if (breakMinutes.innerText > 1){
    breakMinutes.innerHTML = parseInt(breakMinutes.innerHTML) - 1;
  }
  reset();
});

document.getElementById("breakUp").addEventListener("click",function(){
  stopCounter();
  breakMinutes.innerHTML = parseInt(breakMinutes.innerHTML) + 1;
  reset();
});

//resets the timer and canvas
var reset = function(){
  onBreak = false;
  seconds = 0;
  blackCircle("clear");
  minutes = pomMinutes.innerHTML;
  breakTime = breakMinutes.innerText;
  display();
}

//function to show time remaining
var display = function(){
  var displaySec;
  if (seconds < 10){
    displaySec = "0" + seconds;
  } else {
    displaySec = seconds;
  }
  document.getElementById("timer").innerHTML = minutes + ":" + displaySec;
};


//function to alter time remaining
var counter = function(){
  if (seconds !== 0){
    seconds -= 1;
  } else {
    minutes -= 1;
    seconds += 59;
  }
  //call display and timerCircle to display new time remaining
  display();
  timerCircle();
  if (minutes === 0 && seconds === 0 && !onBreak){
    onBreak = true;
    timerChimer.play();
    minutes += breakTime;
  } else if (minutes === 0 && seconds === 0 && onBreak){
    onBreak = false;
    timerChimer.play();
    stopCounter();
    blackCircle("clear");
    reset();
  }
}

//calls counter function every second while running
var runCounter = function(){
  running = true;
  intervalID = window.setInterval(counter,1000);
};

//stops the counter, does not reset values
var stopCounter = function(){
  running = false;
  window.clearInterval(intervalID);
};


//optional flag will draw black circle without canvas rotation or translation
function blackCircle(flag){
  var canvas = document.getElementById('timerCanvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 10;
    if (!flag){
      ctx.translate(150,150);
      ctx.rotate(-Math.PI/2);
      ctx.lineWidth = 19;
    }
    ctx.beginPath();
    ctx.arc(0, 0, 140, 0, (2 * Math.PI));
    ctx.stroke();
  }
};

//this function draws and erases the smaller blue circle inside blackCircle
function timerCircle(){
  var canvas = document.getElementById('timerCanvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');
    var remaining = minutes * 60 + seconds;
    var initial = pomMinutes.innerHTML * 60;
    var percent = ((initial-remaining)/initial);
    var stroke = "#0af";
    var width = width = 9;
    var counterClockwise = false;
    if (onBreak){
      //settings change onBreak to erase blue circle 
      initial = breakTime * 60;
      percent = (1 - (initial-remaining)/initial);
      stroke = "#000";
      width = 10;
      counterClockwise = true;
    }
    ctx.shadowColor = "black";
    ctx.shadowBlur = 1;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.arc(0, 0, 140, 0, (2 * Math.PI) * percent, counterClockwise);
    ctx.stroke();
  }
};

//call blackCircle without flag to orient canvas and draw first circle
blackCircle();
