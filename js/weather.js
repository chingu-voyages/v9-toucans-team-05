
// Time
var update = function() {
    document.getElementById('current-time').innerHTML = moment().format('HH:mm');
};
setInterval(update, 1000);

// Welcome Message
var hour = moment().format('HH');
if (hour >= 4 && hour < 12) {
 document.getElementById('message').innerHTML = "Good morning.";
} else if (hour>12 && hour < 17) {
  document.getElementById('message').innerHTML = "Good afternoon.";
} else {
  document.getElementById('message').innerHTML = "Good evening.";
}

// Weather
if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(showPosition);
} else {
 alert('Geolocation is not supported in your browser');
}

function showPosition(position) {
  var api = "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;

  $.getJSON(api, function(data){
    $("#location").html(data.name);
    $("#temperature").html(data.main.temp.toFixed(0) + "°");

    switch (data.weather[0].main) {
      case "Clouds": $("#weather-icon").html("<i class='wi wi-day-cloudy'></i>");
      break;
      case "Clear Sky": $("#weather-icon").html("<i class='wi wi-day-sunny'></i>");
      break;
      case "Rain": $("#weather-icon").html("<i class='wi wi-rain-wind'></i>");
      break;
      case "Thunderstorm": $("#weather-icon").html("<i class='wi wi-thunderstorm'></i>");
      break;
      case "Snow": $("#weather-icon").html("<i class='wi wi-snow'></i>");
      break;
      case "Mist": $("#weather-icon").html("<i class='wi wi-fog'></i>");
    }
  });
}
