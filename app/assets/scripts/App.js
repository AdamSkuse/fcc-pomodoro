var timerId;
var workInterval = {mins: 0, secs: 10};
var currentWorkTimer = {mins: 0, secs: 10};
var breakInterval = {mins: 0, secs: 5};
var currentBreakTimer = {mins: 0, secs: 5};
var isBreak = false;
var timerIsRunning = false;

var clockDisplay = document.getElementById('clock-display');
var startButton = document.getElementById('start-button');

startButton.addEventListener('click', function(){startButtonClick()});


function startButtonClick() {
  if (!timerIsRunning) {
    if(!isBreak) {
      startTimer(currentWorkTimer);
    } else {
      startTimer(currentBreakTimer);
    }
  
  } else {
    pauseTimer();
  }
}


function resetCurrentTimers() {
  currentBreakTimer.secs = breakInterval.secs;
  currentBreakTimer.mins = breakInterval.mins;
  currentWorkTimer.secs = workInterval.secs;
  currentWorkTimer.mins = workInterval.mins;
}

function startNewTimer(){
  resetCurrentTimers();
  startTimer(currentWorkTimer);
}

function startTimer(timer){
  timerId = setInterval(function(){timerTick(timer)}, 1000);
  timerIsRunning = true;
}

function pauseTimer() {
  clearInterval(timerId);
  timerIsRunning = false;
}

function unpauseTimer() {
  if (isBreak) {
    startTimer(currentBreakTimer);
  } else {
    startTimer(currentWorkTimer);
  }
}

function timerTick(timer) {
  if ((timer.mins >= 0) && (timer.secs >= 0)) {
    clockDisplay.innerHTML = "Mins: " + timer.mins + " Secs: " + timer.secs;
    console.log(timer.mins + ':' + timer.secs);
   if (timer.secs >= 1) {
      timer.secs --;
    } else {
      timer.mins --;
      timer.secs = 59;
   }
  } else {
    pauseTimer();
    isBreak = !isBreak;
    resetCurrentTimers();
    console.log('Break: ' + isBreak)
    
    if (isBreak) {
      console.log('Break timer!');
      startTimer(currentBreakTimer);
    } else {
      console.log('Task timer!');
      startTimer(currentWorkTimer);
    }

  }
}


