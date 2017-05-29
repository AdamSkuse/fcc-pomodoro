var time = new Date;
console.log(time);
time.setSeconds(30);
time.setMinutes(0);
console.log(time.getSeconds());
console.log(time.getMinutes());
console.log(time.getMinutes());
function timerStart(){
  var timerInterval = setInterval(function(){
    time.setSeconds(time.getSeconds() - 1);
    console.log('mins: ' + time.getMinutes() + ' secs: ' + time.getSeconds())
    if (time.getMinutes() === 0 && time.getSeconds()=== 0){
      console.log('time up!');
      clearInterval(timerInterval);
    }
  },1000);
}
