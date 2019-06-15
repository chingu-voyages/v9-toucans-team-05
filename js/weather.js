
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
        case "lc": $(".weather-icon-one").html("<i class='wi wi-day-cloudy'></i>");
        break;
        case "hc": $(".weather-icon-one").html("<i class='wi wi-cloudy'></i>");
        break;
        case "c": $(".weather-icon-one").html("<i class='wi wi-day-sunny'></i>");
        break;
        case "hr": $(".weather-icon-one").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "lr": $(".weather-icon-one").html("<i class='wi wi-rain-wind'></i>");
        break;
        case "t": $(".weather-icon-one").html("<i class='wi wi-thunderstorm'></i>");
        break;
        case "sn": $(".weather-icon-one").html("<i class='wi wi-snow'></i>");
        break;
        case "sl": $(".weather-icon-one").html("<i class='wi wi-sleet'></i>");
        break;
        case "h": $(".weather-icon-one").html("<i class='wi wi-hail'></i>");
        break;
        case "s": $(".weather-icon-one").html("<i class='wi wi-day-rain'></i>");
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
    var weekDayTwo = getWeekDay(tomorrow);
    $(".weekday-two").html(weekDayTwo.slice(0, 3).toUpperCase());

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    var weekDayThree = getWeekDay(tomorrow);
    $(".weekday-three").html(weekDayThree.slice(0, 3).toUpperCase());

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 3);
    var weekDayFour = getWeekDay(tomorrow);
    $(".weekday-four").html(weekDayFour.slice(0, 3).toUpperCase());

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 4);
    var weekDayFive = getWeekDay(tomorrow);
    $(".weekday-five").html(weekDayFive.slice(0, 3).toUpperCase());

 // Show forecast on click
  $('.Weather-and-location').click(function(){
    $('.forecast-container').toggle();
    $('.forecast-container').click(function(e) {
        e.stopPropagation();
    });
  });

  $('#day-two').click(function(){
    $(".weather-description").html(weatherDescriptionTwo);
    $('#current-temperature').remove();
    $('.max-temperature-det').remove();
    $('.min-temperature-det').remove();
    var x = '<span class="max-temperature-det">' + tempTwo + '</span><span class="min-temperature-det">' + tempMinTwo + '</span>';
    $('#current-temp-icon').append(x);
    $('.forecast-day').remove();
    $('#forecast-location').after('<div class="forecast-day">' + weekDayTwo + '</div>');
    $('#current-weather-icon').remove();
    $('#forecast-icon').remove();
    $('.weather-icon-two').clone().prependTo('#current-temp-icon').attr('id', 'forecast-icon');
  });
  $('#day-three').click(function(){
    $(".weather-description").html(weatherDescriptionThree);
    $('#current-temperature').remove();
    $('.max-temperature-det').remove();
    $('.min-temperature-det').remove();
    var x = '<span class="max-temperature-det">' + tempThree + '</span><span class="min-temperature-det">' + tempMinThree + '</span>';
    $('#current-temp-icon').append(x);
    $('.forecast-day').remove();
    $('#forecast-location').after('<div class="forecast-day">' + weekDayThree + '</div>');
    $('#current-weather-icon').remove();
    $('#forecast-icon').remove();
    $('.weather-icon-three').clone().prependTo('#current-temp-icon').attr('id', 'forecast-icon');
  });
  $('#day-four').click(function(){
    $(".weather-description").html(weatherDescriptionFour);
    $('#current-temperature').remove();
    $('.max-temperature-det').remove();
    $('.min-temperature-det').remove();
    var x = '<span class="max-temperature-det">' + tempFour + '</span><span class="min-temperature-det">' + tempMinFour + '</span>';
    $('#current-temp-icon').append(x);
    $('.forecast-day').remove();
    $('#forecast-location').after('<div class="forecast-day">' + weekDayFour + '</div>');
    $('#current-weather-icon').remove();
    $('#forecast-icon').remove();
    $('.weather-icon-four').clone().prependTo('#current-temp-icon').attr('id', 'forecast-icon');
  });
  $('#day-five').click(function(){
    $(".weather-description").html(weatherDescriptionFive);
    $('#current-temperature').remove();
    $('.max-temperature-det').remove();
    $('.min-temperature-det').remove();
    var x = '<span class="max-temperature-det">' + tempFive + '</span><span class="min-temperature-det">' + tempMinFive + '</span>';
    $('#current-temp-icon').append(x);
    $('.forecast-day').remove();
    $('#forecast-location').after('<div class="forecast-day">' + weekDayFive + '</div>');
    $('#current-weather-icon').remove();
    $('#forecast-icon').remove();
    $('.weather-icon-five').clone().prependTo('#current-temp-icon').attr('id', 'forecast-icon');
  });
  $('#day-one').click(function(){
    $(".weather-description").html(weatherDescription);
    $('.max-temperature-det').remove();
    $('.min-temperature-det').remove();
    $('#current-temperature').remove();
    $('#current-temp-icon').append('<span class="temperature" id="current-temperature">' + temp + '</span>');
    $('.forecast-day').remove();
    $('#current-weather-icon').remove();
    $('#forecast-icon').remove();
    $('.weather-icon-one:first').clone().prependTo('#current-temp-icon').attr('id', 'forecast-icon');
  });
