var timerId;
var workInterval = {mins: 25, secs: 0};
var currentWorkTimer = {mins: 0, secs: 10};
var breakInterval = {mins: 5, secs: 0};
var currentBreakTimer = {mins: 0, secs: 5};
var isBreak = false;
var timerIsRunning = false;

var clockDisplay = document.getElementById('clock-display');
var workRestDisplay = document.getElementById('work-rest-display');
var startButton = document.getElementById('start-button');
var worktimeSetter = document.getElementById('worktime-setter');
var breaktimeSetter = document.getElementById('breaktime-setter');
var setTimesButton = document.getElementById('set-times-button');

startButton.addEventListener('click', function(){startButtonClick()});
setTimesButton.addEventListener('click', function(){setTimers()});

//reset timers so all are initially derived from default input values
resetSetters();
setTimers();
resetCurrentTimers();

function resetSetters(){
  worktimeSetter.value = workInterval.mins;
  breaktimeSetter.value = breakInterval.mins;
}

function setTimers() {
  if (!timerIsRunning) {
    if ((worktimeSetter.value >= 1 && worktimeSetter.value <= 59) && (breaktimeSetter.value >= 1 && breaktimeSetter.value <= 59)) {
      workInterval.mins = worktimeSetter.value;
      breakInterval.mins = breaktimeSetter.value;
      isBreak = false;
      resetDisplays();
      resetCurrentTimers();
    } else {
      alert("Times must be between 1 and 59");
      resetSetters();    
    }
  }
}
  
function resetCurrentTimers() {
  currentBreakTimer.secs = breakInterval.secs;
  currentBreakTimer.mins = breakInterval.mins;
  currentWorkTimer.secs = workInterval.secs;
  currentWorkTimer.mins = workInterval.mins;
}

function resetDisplays() {
    workRestDisplay.innerHTML = "";
    updateTimerDisplay(workInterval); 
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
    startButton.innerHTML="Pause";
  } else {
    pauseTimer();
    startButton.innerHTML="Start";
  }
}

function startTimer(timer){
  timerId = setInterval(function(){timerTick(timer)}, 1000);
  timerIsRunning = true;
}

function pauseTimer() {
  clearInterval(timerId);
  timerIsRunning = false;
}

function timerTick(timer) {
  if ((timer.mins >= 0) && (timer.secs >= 0)) {
    updateTimerDisplay(timer);
   if (timer.secs >= 1) {
      timer.secs --;
    } else {
      timer.mins --;
      timer.secs = 59;
   }
  } else {
    pauseTimer();
    isBreak = !isBreak;
    playSound();
    resetCurrentTimers();
    
    if (isBreak) {
      workRestDisplay.innerHTML = "Break time!";
      startTimer(currentBreakTimer);
    } else {
      workRestDisplay.innerHTML = "Work time!";
      startTimer(currentWorkTimer);
    }
  }
}

function updateTimerDisplay(timer) {
  var minsToDisplay, secsToDisplay;

  if (timer.mins >= 10) {
    minsToDisplay = timer.mins;
  }  else {
    minsToDisplay = "0".concat(timer.mins.toString());
  }

  if (timer.mins < 1) {
    clockDisplay.style.color = "red";
  } else {
    clockDisplay.style.color = "#00ff00";
  }

  if (timer.secs >= 10) {
    secsToDisplay = timer.secs;
  }  else {
    secsToDisplay = "0".concat(timer.secs.toString());
  }

  clockDisplay.innerHTML = minsToDisplay + ":" + secsToDisplay;
}

function playSound() {
  var sound = document.getElementById('bell');
  sound.play();
}
