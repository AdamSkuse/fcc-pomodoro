var timerId;
var workInterval = {mins: 0, secs: 10};
var currentWorkTimer = {mins: 0, secs: 10};
var breakInterval = {mins: 0, secs: 5};
var currentBreakTimer = {mins: 0, secs: 5};
var isBreak = false;
var timerIsRunning = false;

var clockDisplay = document.getElementById('clock-display');
var workRestDisplay = document.getElementById('work-rest-display');
var startButton = document.getElementById('start-button');
var worktimeSetter = document.getElementById('worktime-setter');
var breaktimeSetter = document.getElementById('breaktime-setter');
var setTimesButton = document.getElementById('set-times-button');

clockDisplay.innerHTML = "Mins: " + workInterval.mins + " Secs: " + workInterval.secs;
worktimeSetter.value = workInterval.secs;
breaktimeSetter.value = breakInterval.secs;

startButton.addEventListener('click', function(){startButtonClick()});
setTimesButton.addEventListener('click', function(){setTimers()});

function setTimers() {
  if (!timerIsRunning) {
    workInterval.secs = worktimeSetter.value;
    breakInterval.secs = breaktimeSetter.value;
    isBreak = false;
    workRestDisplay.innerHTML = "";
    clockDisplay.innerHTML = "Mins: " + workInterval.mins + " Secs: " + workInterval.secs;
    resetCurrentTimers();
  }
}
  


function startButtonClick() {
  if (!timerIsRunning) {
    if(!isBreak) {
      workRestDisplay.innerHTML = "Work time!";
      startTimer(currentWorkTimer);
    } else {
      workRestDisplay.innerHTML = "Break time!";
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
      workRestDisplay.innerHTML = "Break time!";
      startTimer(currentBreakTimer);
    } else {
      console.log('Task timer!');
      workRestDisplay.innerHTML = "Work time!";
      startTimer(currentWorkTimer);
    }

  }
}


