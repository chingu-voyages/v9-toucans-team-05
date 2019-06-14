
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
  var geoApi = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/search/?lattlong=" + position.coords.latitude + "," + position.coords.longitude;

  $.getJSON(geoApi, function(data){
    var weatherApi = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/" + data[0].woeid;
    $(".location").html(data[0].title);
    $.getJSON(weatherApi, function(json){
      $(".temperature").html(json.consolidated_weather[0].the_temp.toFixed(0) + "°");
      $(".max-temperature").html(json.consolidated_weather[0].max_temp.toFixed(0) + "°");
      $(".min-temperature").html(json.consolidated_weather[0].min_temp.toFixed(0) + "°");


      switch (json.consolidated_weather[0].weather_state_abbr) {
        case "lc": $(".weather-icon").html("<i class='wi wi-day-cloudy'></i>");
        break;
        case "hc": $(".weather-icon").html("<i class='wi wi-cloudy'></i>");
        break;
        case "c": $(".weather-icon").html("<i class='wi wi-day-sunny'></i>");
        break;
        case "hr": $(".weather-icon").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "lr": $(".weather-icon").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "t": $(".weather-icon").html("<i class='wi wi-thunderstorm'></i>");
        break;
        case "sn": $(".weather-icon").html("<i class='wi wi-snow'></i>");
        break;
        case "sl": $(".weather-icon").html("<i class='wi wi-sleet'></i>");
        break;
        case "h": $(".weather-icon").html("<i class='wi wi-hail'></i>");
        break;
        case "s": $(".weather-icon").html("<i class='wi wi-day-rain'></i>");
        break;
    }

          var output = '';
          for (var i = 0; i < json.consolidated_weather.length; i++) {
            output += '<div class="weekday"></div><div class="current-temp-icon">' +
            '<span class ="weather-icon" id="forecast-weather-icon"></span>' +
            '<span class="max-temperature" id="max-temperature"></span>' +
            '<span class="min-temperature" id="min-temperature">' +
            '</span></div>';

            switch (json.consolidated_weather[i].weather_state_abbr) {
              case "lc": $(".weather-icon").html("<i class='wi wi-day-cloudy'></i>");
              break;
              case "hc": $(".weather-icon").html("<i class='wi wi-cloudy'></i>");
              break;
              case "c": $(".weather-icon").html("<i class='wi wi-day-sunny'></i>");
              break;
              case "hr": $(".weather-icon").html("<i class='wi wi-rain-wind'></i>");
              break;
              case "lr": $(".weather-icon").html("<i class='wi wi-rain-wind'></i>");
              break;
              case "t": $(".weather-icon").html("<i class='wi wi-thunderstorm'></i>");
              break;
              case "sn": $(".weather-icon").html("<i class='wi wi-snow'></i>");
              break;
              case "sl": $(".weather-icon").html("<i class='wi wi-sleet'></i>");
              break;
              case "h": $(".weather-icon").html("<i class='wi wi-hail'></i>");
              break;
              case "s": $(".weather-icon").html("<i class='wi wi-day-rain'></i>");
              break;
          }
          }
          $(".day").html(output);


  });
  });
  }
