function FetchItems() {
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
      localStorage.setItem("BG_Rand10Img", JSON.stringify(urlObject));
    })
    .catch(function(err) {
      console.log(err);
    });
  return localStorage.getItem("BG_Rand10Img");
}

function createTimeFrame() {
  var timeframeNum = [];
  for (var i = 0; i < 10; i++) {
    timeframeNum[i] = Math.floor(Math.random() * 10);
  }

  var BG_Morning = [];
  var BG_Daytime = [];
  var BG_Night = [];

  var imgJson = localStorage.getItem("BG_Rand10Img");
  var obj = JSON.parse(imgJson);

  for (var i = 0; i < 3; i++) {
    var j = i + 3;
    var k = i + 6;
    BG_Morning[i] = "url(" + obj[timeframeNum[i]] + ")";
    BG_Daytime[i] = "url(" + obj[timeframeNum[j]] + ")";
    BG_Night[i] = "url(" + obj[timeframeNum[k]] + ")";
  }
  //Add 1 variable to set Total = 10
  BG_Night.push(obj[timeframeNum[9]]);

  localStorage.setItem("BG_Morning", JSON.stringify(BG_Morning));
  localStorage.setItem("BG_Daytime", JSON.stringify(BG_Daytime));
  localStorage.setItem("BG_Night", JSON.stringify(BG_Night));
}

function setTimeFrame() {
  date = new Date();
  today = "BG_" + (date.getMonth() + 1) + "/" + date.getDate();
  yesterday = date.getMonth() + "/" + date.getDate();
  hour = date.getHours();
  if (hour >= 4 && hour < 12) {
    timeframe = "BG_Morning";
  } else if (hour >= 12 && hour < 20) {
    timeframe = "BG_Daytime";
  } else {
    timeframe = "BG_Night";
  }
}

function rmBG_Old() {
  var RM_key = [];
  for (var i = 0; i < localStorage.length; i++) {
    BG_key = localStorage.key(i);
    if (BG_key.startsWith("BG_")) {
      RM_key[i] = BG_key;
    }
  }
  for (var i = 0; i < RM_key.length; i++) {
    localStorage.removeItem(RM_key[i]);
  }
}

function sleep(msec) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, msec);
  });
}

async function fetchAll() {
  FetchItems();
  while (!localStorage.getItem("BG_Rand10Img")) {
    await sleep(200);
    if (count > 24) {
      break;
    }
    count++;
  }
  createTimeFrame();
}

window.onload = async function Background() {
  setTimeFrame();
  if (!localStorage.getItem(timeframe)) {
    rmBG_Old();
    localStorage.setItem(today, date);
    fetchAll();
  } else {
    if (!localStorage.getItem(today)) {
      rmBG_Old();
      localStorage.setItem(today, date);
      fetchAll();
    }
  }
  var bgTime = localStorage.getItem(timeframe);
  var count = 0;
  while (!localStorage.getItem("BG_Rand10Img")) {
    await sleep(200);
    if (count > 24) {
      break;
    }
    count++;
  }
  var bgImages = JSON.parse(bgTime);
  var count = 0;
  while (!bgImages) {
    await sleep(200);
    if (count > 24) {
      break;
    }
    count++;
  }
  document.getElementById("bg-img").style.backgroundImage =
    bgImages[Math.floor(Math.random() * bgImages.length)];
};
