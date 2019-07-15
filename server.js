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
app.use('/img',express.static(path.join(__dirname,"img")))

app.get('/', (req, res) => {
  function createURL() {
    //API base URL to get random photo
    const collectionID='6809020,6091305',
    BaseUrl ='https://api.unsplash.com//photos/random/?',
    collections ='collections='+collectionID
    options = '&featured=true&orientation=landscape',
    APIkey = '&client_id=' + process.env.US_AcsKey,
        url = BaseUrl + collections + options + APIkey;
      return url;
    }
    let imgBaseURL=createURL();
  
  async function fetchURL() {
      const res = await fetch(imgBaseURL);
      data = await res.json();
      return data;
    }
  
  fetchURL()
  .then(function(data) {
    var city = (typeof(data.location)=="undefined") 
        ? '' 
        : (typeof(data.location.city)=="undefined")
          ? ''
          : data.location.city;
    var country = (typeof(data.location)=="undefined") 
        ? '' 
        : (typeof(data.location.country)=="undefined")
          ? ''
          : data.location.country;
      res.render('index',
        { img: 'background-image:url("'+data.urls.raw+'&w=1600")',
          author:'Photo by : '+data.user.name+' / Unsplash</a> ',
          city:city,
          country:country,
          link:'<a href="'+data.links.download+'" target="_blank">'
        }
      );
  })
  .catch(function(err) {
    console.log(err);
    res.render('index',
        { img: "background-image:url(https://source.unsplash.com/collection/6809020)",
          author:"",
          city:"",
          country:"",
          link:""
        });
  });
  
})

const server = http.createServer(app);
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});