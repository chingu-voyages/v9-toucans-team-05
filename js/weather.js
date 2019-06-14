
// Time
var update = function() {
    $('#current-time').html(moment().format('HH:mm'));
};
setInterval(update, 1000);

// Welcome Message
var hour = moment().format('HH');
if (hour >= 4 && hour < 12) {
 $('#message').html("Good morning.");
} else if (hour>12 && hour < 17) {
  $('#message').html("Good afternoon.");
} else {
  $('#message').html("Good evening.");
}

// Weather
if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(showPosition);
} else {
 alert('Geolocation is not supported in your browser');
}

var weatherDescriptionTwo;
var weatherDescriptionThree;
var weatherDescriptionFour;
var weatherDescriptionFive;
var weatherDescription;
var temp;
var tempMin;

function showPosition(position) {
  var geoApi = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/search/?lattlong=" + position.coords.latitude + "," + position.coords.longitude;

  $.getJSON(geoApi, function(data){
    var weatherApi = "https://api.codetabs.com/v1/proxy?quest=https://www.metaweather.com/api/location/" + data[0].woeid;
    $(".location").html(data[0].title);
    $.getJSON(weatherApi, function(json){
      $(".temperature").html(json.consolidated_weather[0].the_temp.toFixed(0) + "°");
      $(".max-temperature").html(json.consolidated_weather[0].max_temp.toFixed(0) + "°");
      $(".min-temperature").html(json.consolidated_weather[0].min_temp.toFixed(0) + "°");
      $(".max-temperature-two").html(json.consolidated_weather[1].max_temp.toFixed(0) + "°");
      $(".min-temperature-two").html(json.consolidated_weather[1].min_temp.toFixed(0) + "°");
      $(".max-temperature-three").html(json.consolidated_weather[2].max_temp.toFixed(0) + "°");
      $(".min-temperature-three").html(json.consolidated_weather[2].min_temp.toFixed(0) + "°");
      $(".max-temperature-four").html(json.consolidated_weather[3].max_temp.toFixed(0) + "°");
      $(".min-temperature-four").html(json.consolidated_weather[3].min_temp.toFixed(0) + "°");
      $(".max-temperature-five").html(json.consolidated_weather[4].max_temp.toFixed(0) + "°");
      $(".min-temperature-five").html(json.consolidated_weather[4].min_temp.toFixed(0) + "°");
      $(".weather-description").html(json.consolidated_weather[0].weather_state_name);
      weatherDescriptionTwo = json.consolidated_weather[1].weather_state_name;
      weatherDescriptionThree = json.consolidated_weather[2].weather_state_name;
      weatherDescriptionFour = json.consolidated_weather[3].weather_state_name;
      weatherDescriptionFive = json.consolidated_weather[4].weather_state_name;
      weatherDescription = json.consolidated_weather[0].weather_state_name;
      temp = json.consolidated_weather[0].the_temp.toFixed(0) + "°";
      tempTwo = json.consolidated_weather[1].max_temp.toFixed(0) + "°";
      tempMinTwo = json.consolidated_weather[1].min_temp.toFixed(0) + "°";
      tempThree = json.consolidated_weather[2].max_temp.toFixed(0) + "°";
      tempMinThree = json.consolidated_weather[2].min_temp.toFixed(0) + "°";
      tempFour = json.consolidated_weather[3].max_temp.toFixed(0) + "°";
      tempMinFour = json.consolidated_weather[3].min_temp.toFixed(0) + "°";
      tempFive = json.consolidated_weather[4].max_temp.toFixed(0) + "°";
      tempMinFive = json.consolidated_weather[4].min_temp.toFixed(0) + "°";



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
      switch (json.consolidated_weather[1].weather_state_abbr) {
        case "lc": $(".weather-icon-two").html("<i class='wi wi-day-cloudy'></i>");
        break;
        case "hc": $(".weather-icon-two").html("<i class='wi wi-cloudy'></i>");
        break;
        case "c": $(".weather-icon-two").html("<i class='wi wi-day-sunny'></i>");
        break;
        case "hr": $(".weather-icon-two").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "lr": $(".weather-icon-two").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "t": $(".weather-icon-two").html("<i class='wi wi-thunderstorm'></i>");
        break;
        case "sn": $(".weather-icon-two").html("<i class='wi wi-snow'></i>");
        break;
        case "sl": $(".weather-icon-two").html("<i class='wi wi-sleet'></i>");
        break;
        case "h": $(".weather-icon-two").html("<i class='wi wi-hail'></i>");
        break;
        case "s": $(".weather-icon-two").html("<i class='wi wi-day-rain'></i>");
        break;
    }
      switch (json.consolidated_weather[2].weather_state_abbr) {
        case "lc": $(".weather-icon-three").html("<i class='wi wi-day-cloudy'></i>");
        break;
        case "hc": $(".weather-icon-three").html("<i class='wi wi-cloudy'></i>");
        break;
        case "c": $(".weather-icon-three").html("<i class='wi wi-day-sunny'></i>");
        break;
        case "hr": $(".weather-icon-three").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "lr": $(".weather-icon-three").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "t": $(".weather-icon-three").html("<i class='wi wi-thunderstorm'></i>");
        break;
        case "sn": $(".weather-icon-three").html("<i class='wi wi-snow'></i>");
        break;
        case "sl": $(".weather-icon-three").html("<i class='wi wi-sleet'></i>");
        break;
        case "h": $(".weather-icon-three").html("<i class='wi wi-hail'></i>");
        break;
        case "s": $(".weather-icon-three").html("<i class='wi wi-day-rain'></i>");
        break;
    }
      switch (json.consolidated_weather[3].weather_state_abbr) {
        case "lc": $(".weather-icon-four").html("<i class='wi wi-day-cloudy'></i>");
        break;
        case "hc": $(".weather-icon-four").html("<i class='wi wi-cloudy'></i>");
        break;
        case "c": $(".weather-icon-four").html("<i class='wi wi-day-sunny'></i>");
        break;
        case "hr": $(".weather-icon-four").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "lr": $(".weather-icon-four").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "t": $(".weather-icon-four").html("<i class='wi wi-thunderstorm'></i>");
        break;
        case "sn": $(".weather-icon-four").html("<i class='wi wi-snow'></i>");
        break;
        case "sl": $(".weather-icon-four").html("<i class='wi wi-sleet'></i>");
        break;
        case "h": $(".weather-icon-four").html("<i class='wi wi-hail'></i>");
        break;
        case "s": $(".weather-icon-four").html("<i class='wi wi-day-rain'></i>");
        break;
      }
      switch (json.consolidated_weather[4].weather_state_abbr) {
        case "lc": $(".weather-icon-five").html("<i class='wi wi-day-cloudy'></i>");
        break;
        case "hc": $(".weather-icon-five").html("<i class='wi wi-cloudy'></i>");
        break;
        case "c": $(".weather-icon-five").html("<i class='wi wi-day-sunny'></i>");
        break;
        case "hr": $(".weather-icon-five").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "lr": $(".weather-icon-five").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "t": $(".weather-icon-five").html("<i class='wi wi-thunderstorm'></i>");
        break;
        case "sn": $(".weather-icon-five").html("<i class='wi wi-snow'></i>");
        break;
        case "sl": $(".weather-icon-five").html("<i class='wi wi-sleet'></i>");
        break;
        case "h": $(".weather-icon-five").html("<i class='wi wi-hail'></i>");
        break;
        case "s": $(".weather-icon-five").html("<i class='wi wi-day-rain'></i>");
        break;
      }
  });
  });
  }

// Days of the week
    $(".weekday-one").html(moment().format('ddd').toUpperCase());

    function getWeekDay(date){
      var weekdays = new Array(
          "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
      );
      var day = date.getDay();
      return weekdays[day];
    }

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var weekDay = getWeekDay(tomorrow);
    $(".weekday-two").html(weekDay.slice(0, 3).toUpperCase());

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    var weekDay = getWeekDay(tomorrow);
    $(".weekday-three").html(weekDay.slice(0, 3).toUpperCase());

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 3);
    var weekDay = getWeekDay(tomorrow);
    $(".weekday-four").html(weekDay.slice(0, 3).toUpperCase());

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 4);
    var weekDay = getWeekDay(tomorrow);
    $(".weekday-five").html(weekDay.slice(0, 3).toUpperCase());

 // Show forecast on click
  $('.Weather-and-location').click(function(){
    $('.forecast-container').toggle();
  });

  $('#day-two').click(function(){
    $(".weather-description").html(weatherDescriptionTwo);
    $('#current-temperature').remove();
    $('.max-temperature-det').remove();
    $('.min-temperature-det').remove();
    var x = '<span class="max-temperature-det">' + tempTwo + '</span><span class="min-temperature-det">' + tempMinTwo + '</span>';
    $('#current-temp-icon').append(x);
  });
  $('#day-three').click(function(){
    $(".weather-description").html(weatherDescriptionThree);
    $('#current-temperature').remove();
    $('.max-temperature-det').remove();
    $('.min-temperature-det').remove();
    var x = '<span class="max-temperature-det">' + tempThree + '</span><span class="min-temperature-det">' + tempMinThree + '</span>';
    $('#current-temp-icon').append(x);
  });
  $('#day-four').click(function(){
    $(".weather-description").html(weatherDescriptionFour);
    $('#current-temperature').remove();
    $('.max-temperature-det').remove();
    $('.min-temperature-det').remove();
    var x = '<span class="max-temperature-det">' + tempFour + '</span><span class="min-temperature-det">' + tempMinFour + '</span>';
    $('#current-temp-icon').append(x);
  });
  $('#day-five').click(function(){
    $(".weather-description").html(weatherDescriptionFive);
    $('#current-temperature').remove();
    $('.max-temperature-det').remove();
    $('.min-temperature-det').remove();
    var x = '<span class="max-temperature-det">' + tempFive + '</span><span class="min-temperature-det">' + tempMinFive + '</span>';
    $('#current-temp-icon').append(x);
  });
  $('#day-one').click(function(){
    $(".weather-description").html(weatherDescription);
    $('.max-temperature-det').remove();
    $('.min-temperature-det').remove();
    $('#current-temp-icon').append('<span class="temperature" id="current-temperature">' + temp + '</span>')
  });
