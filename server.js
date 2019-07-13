require('dotenv').config();
const http = require('http'),
 path = require('path'),
 express = require('express'),
 app = express(),
 fetch = require('node-fetch');

app.set('views',path.join(__dirname,'./'));
app.set('view engine','ejs');
app.use('/static',express.static(path.join(__dirname,"static")));
app.use('/js',express.static(path.join(__dirname,"js")))

function createURL(value) {
    const BaseUrl = 'https://api.unsplash.com/search/photos?page=1',
      keyword = "&query=" + encodeURIComponent(value),
      APIkey ='&client_id=' + process.env.US_AcsKey,
      url = BaseUrl + keyword + APIkey;
    return url;
  }
const imgBaseURL=createURL('World Heritage');

async function fetchURL() {
    const res = await fetch(imgBaseURL);
    data = await res.json();
    return data;
  }
  const result=[],
  imgURL=[],
  Name=[],
  Location=[];

  fetchURL()
  .then(function(data) {
    dt=data.results;
    for(i=0;i<dt.length;i++){
      imgURL[i] = dt[i].urls.raw+"&w=1600";
      Name[i]=dt[i].user.name;
      Location[i]=dt[i].user.location;  
      result.push({img:imgURL[i],author:Name[i],location:Location[i]});
    }
  })
  .catch(function(err) {
    console.log(err);
  });
    app.get('/', (req, res) => {
      let n = Math.floor(Math.random() * 10);
      res.render('index',{img:result[n]['img'],author:result[n]['author'],location:result[n]['location']});
    })


const server = http.createServer(app);
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});