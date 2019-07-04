function intRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(JSON.stringify(process.env));
function FetchItems() {
  ("use strict");
  var value = "World Heritage";
  function createURL(value) {
    var API_key = "12743134-37f71928426932ad3d292fa38",
      BaseUrl = "https://pixabay.com/api/?key=" + API_key,
      keyword = "&q=" + encodeURIComponent(value),
      option =
        "&editorschoice=true&safesearch=true&image_type=photo&orientation=horizontal&per_page=200",
      url = BaseUrl + keyword + option;
    return url;
  }

  var imageURL = createURL(value),
    randNum = [];

  for (var i = 0; i < 10; i++) {
    randNum[i] = Math.floor(Math.random() * 200);
  }

  randNum.sort(function(a, b) {
    return a < b ? -1 : 1;
  });

  async function fetchURL() {
    var res = await fetch(imageURL),
      data = await res.json();
    return data;
  }

  var urlObject = [],
    k = 0;
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

function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}

function createTimeFrame() {
  var timeframeNum = [],
    min = 0,
    max = 9;
  for (i = min; i <= max; i++) {
    while (true) {
      var tmp = intRandom(min, max);
      if (!timeframeNum.includes(tmp)) {
        timeframeNum.push(tmp);
        break;
      }
    }
  }

  var BG_Morning = [],
    BG_Daytime = [],
    BG_Night = [],
    imgJson = localStorage.getItem("BG_Rand10Img"),
    obj = JSON.parse(imgJson);
  for (var v = 0; i < obj.length; i++) {
    toDataUrl(obj, function(myBase64) {
      imgBase64.push(myBase64);
    });
  }

  for (var i = 0; i < 3; i++) {
    var j = i + 3,
      k = i + 6;
    BG_Morning[i] = "url(" + obj[timeframeNum[i]] + ")";
    BG_Daytime[i] = "url(" + obj[timeframeNum[j]] + ")";
    BG_Night[i] = "url(" + obj[timeframeNum[k]] + ")";
  }
  //Add 1 variable to set Total = 10
  BG_Night.push("url(" + obj[timeframeNum[9]] + ")");

  localStorage.setItem("BG_Morning", JSON.stringify(BG_Morning));
  localStorage.setItem("BG_Daytime", JSON.stringify(BG_Daytime));
  localStorage.setItem("BG_Night", JSON.stringify(BG_Night));
}

function setTimeFrame() {
  date = new Date();
  today = "BG_" + (date.getMonth() + 1) + "/" + date.getDate();
  hour = date.getHours();
  //set timeframe names(tfs) then set timeframe(tf)
  tfs = ["Morning", "Daytime", "Night"];
  if (hour >= 4 && hour < 12) {
    tf = "BG_" + tfs[0];
  } else if (hour >= 12 && hour < 20) {
    tf = "BG_Daytime";
  } else {
    tf = "BG_Night";
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

function sleep(ms) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, ms);
  });
}

async function fetchAll() {
  var count = 0;
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

//remove Old Base64 img file in Local Storage
function rmLSimgB64() {
  var rmTFs = [];
  tfs.map(function(tf) {
    rmTFs.push("BG_" + tf + "_imgB64");
  });
  var rmTFskeys = [];
  for (var i = 0; i < localStorage.length; i++) {
    for (var j = 0; j < rmTFs.length; j++) {
      if (localStorage.key(i).indexOf(rmTFs[j]) >= 0) {
        rmTFskeys.push(localStorage.key(i));
      }
    }
  }
  if (rmTFskeys.length !== 0) {
    rmTFskeys.forEach(function(v) {
      localStorage.removeItem(v);
    });
  }
}

async function setBGimgB64() {
  var count = 0;
  while (!localStorage.getItem(tf)) {
    await sleep(100);
    if (count > 24) {
      break;
    }
    count++;
  }
  bgImages = JSON.parse(localStorage.getItem(tf));
  var count = 0;
  while (!bgImages) {
    await sleep(200);
    if (count > 24) {
      break;
    }
    count++;
  }
  //Store img in Base64 data
  if (!localStorage.getItem(BG_imgB64)) {
    var imgBase64 = [];
    for (var i = 0; i < bgImages.length; i++) {
      bgImages[i] = bgImages[i].slice(4, -1);
      toDataUrl(bgImages[i], function(myBase64) {
        imgBase64.push(myBase64);
      });
    }
    while (imgBase64.length !== bgImages.length) {
      await sleep(200);
      if (count > 24) {
        break;
      }
      count++;
    }
    cmpimgB64 = [];
    for (var i = 0; i < bgImages.length; i++) {
      cmpimgB64[i] = LZString.compress(imgBase64[i]);
    }
    while (cmpimgB64.length !== imgBase64.length) {
      await sleep(200);
      if (count > 24) {
        break;
      }
      count++;
    }
    localStorage.setItem(BG_imgB64, JSON.stringify(cmpimgB64));
  }
}

async function getBGimgB64() {
  //getItem and decompress.
  cmpimgB64 = JSON.parse(localStorage.getItem(BG_imgB64));
  var count = 0;
  while (!cmpimgB64) {
    await sleep(200);
    if (count > 24) {
      break;
    }
    count++;
  }
  //console.log(!!cmpimgB64);
  B64img = LZString.decompress(
    cmpimgB64[Math.floor(Math.random() * cmpimgB64.length)]
  );
  var count = 0;
  while (!B64img) {
    await sleep(200);
    if (count > 24) {
      break;
    }
    count++;
  }
  //console.log(!!B64img);
}

window.onload = async function Background() {
  setTimeFrame();
  BG_imgB64 = tf + "_imgB64";
  if (
    localStorage.getItem(tf) !== null &&
    localStorage.getItem(today) !== null
  ) {
    if (localStorage.getItem(BG_imgB64) !== null) {
      getBGimgB64();
      var count = 0;
      while (!localStorage.getItem(BG_imgB64)) {
        await sleep(200);
        if (count > 24) {
          break;
        }
        count++;
      }
      document.getElementById(
        "bg-img"
      ).style.backgroundImage = `url(${B64img})`;
    } else {
      var bgImages = JSON.parse(localStorage.getItem(tf));
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
      rmLSimgB64();
      setBGimgB64();
    }
  } else {
    rmBG_Old();
    localStorage.setItem(today, date);
    fetchAll();
    var count = 0;
    while (!localStorage.getItem(tf)) {
      await sleep(200);
      if (count > 24) {
        break;
      }
      count++;
    }
    var bgImages = JSON.parse(localStorage.getItem(tf));
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
    setBGimgB64();
  }
};
