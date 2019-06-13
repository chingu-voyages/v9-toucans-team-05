function FetchItems(){
  ("use strict");
  var value = "World Heritage";
  function createURL(value) {
    var API_key = "12743134-37f71928426932ad3d292fa38";
    var BaseUrl = "https://pixabay.com/api/?key=" + API_key;
    var keyword = "&q=" + encodeURIComponent(value);
    var option =
      "&editorschoice=true&safesearch=true&image_type=photo&orientation=horizontal&per_page=200";
    var url = BaseUrl + keyword + option;
    return url;
  }

  var imageURL = createURL(value);
  var randNum = [];

  for (var i = 0; i < 10; i++) {
    randNum[i] = Math.floor(Math.random() * 200);
  }

  randNum.sort(function(a, b) {
    return a < b ? -1 : 1;
  });

  var urlObject = [];
  var k = 0;

  async function fetchURL() {
    var res = await fetch(imageURL);
    var data = await res.json();
    return data;
  }

  fetchURL()
    .then(function(data) {
      for (var j = 0; j < randNum.length; j++) {
        k = parseInt(randNum[j]);
        urlObject[j] = data.hits[k].largeImageURL;
      }
      localStorage.setItem("bgRand10Img", JSON.stringify(urlObject));
    })
    .catch(function(err) {
      console.log(err);
    });
}

function createTimeFrame(){
  var timeframeNum = [];
  for (var i = 0; i < 10; i++) {
    timeframeNum[i] = Math.floor(Math.random() * 10);
  }
  
  var Morning = [];
  var Daytime = [];
  var Night = [];

  var imgJson = localStorage.getItem("bgRand10Img");
  var obj = JSON.parse(imgJson);

  for (var i =0; i<3; i++){
    var j=i+3;
    var k=i+6;
    Morning[i] = "url(" + obj[timeframeNum[i]] + ")";
    Daytime[i] = "url(" + obj[timeframeNum[j]] + ")";
    Night[i] ="url(" + obj[timeframeNum[k]] + ")";
  }
    //Add 1 variable to set Total = 10
    Night.push(obj[timeframeNum[9]]);
  

  localStorage.setItem('Morning', JSON.stringify(Morning));
  localStorage.setItem('Daytime', JSON.stringify(Daytime));
  localStorage.setItem('Night',JSON.stringify(Night));
}

function setTimeFrame(){
  date = new Date();
  today = (date.getMonth()+1+'/'+date.getDate());
  yesterday = (date.getMonth()+'/'+date.getDate());
  hour = (date.getHours());
  if (hour >= 4 && hour < 12) {
    var timeframe = "Morning";
  } else if (hour >= 12 && hour < 20) {
    var timeframe = "Daytime";
  } else {
    var timeframe = "Night";
  }
}
window.onload = function Background() {
  setTimeFrame();
  if(hour==4){
    localStorage.clear()
    FetchItems();
    createTimeFrame();
  }else if(!localStorage.getItem("Morning")){
    FetchItems();
    createTimeFrame();
  }else if (localStorage.getItem(timeframe)) {
    document.getElementById("bg-img").style.backgroundImage = localStorage.getItem(timeframe);
    console.log("you have already saved " + timeframe + " image!");
      } else {
        document.getElementById("bg-img").style.backgroundImage = timeframe;
        localStorage.setItem(timeframe, img);
      }
    }
      
    
  

  var hour = 20;

  
    
    
  }
 
};
