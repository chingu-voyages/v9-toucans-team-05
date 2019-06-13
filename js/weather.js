
// Time
var time = moment().format('HH:mm');

document.getElementById('current-time').innerHTML = time;

var hour = moment().format('HH');
if (hour >= 4 && hour < 12) {
 document.getElementById('message').innerHTML = "Good morning.";
} else if (hour>12 && hour < 17) {
  document.getElementById('message').innerHTML = "Good afternoon.";
} else {
  document.getElementById('message').innerHTML = "Good evening.";
}
