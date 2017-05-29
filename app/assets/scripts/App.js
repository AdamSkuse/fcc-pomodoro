var time = new Date;
var timerRunning = false;

var clockDisplay = document.getElementById('clock-display');
var timerSetter = doxument.getElementById('clock-display');


console.log(time);
time.setSeconds(30);
time.setMinutes(0);
console.log(time.getSeconds());
console.log(time.getMinutes());
console.log(time.getMinutes());

function setTimer() {

}


function startTimer(){
  var timerRunning = true;
  var timerInterval = setInterval(function(){
    time.setSeconds(time.getSeconds() - 1);
    clockDisplay.innerHTML = 'mins: ' + time.getMinutes() + ' secs: ' + time.getSeconds();
    console.log('mins: ' + time.getMinutes() + ' secs: ' + time.getSeconds())
    if (time.getMinutes() === 0 && time.getSeconds()=== 0){
      console.log('time up!');
      timerRunning = false;
      clearInterval(timerInterval);
    }
  },1000);
}
