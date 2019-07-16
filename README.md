# v9-toucans-team-05  
https://momentumdash.com/ | Voyage-9 | https://chingu.io/  

Site published at https://v9-toucans-team-05.herokuapp.com/
## About
We cloned famous Chrome-extension called "Momentum".

## Team Members:  
 [Tetsuya A](https://github.com/peppertaro)  
 [Josy](https://github.com/JH1408)  
 [Sarah](https://github.com/smellaphant)  

## Technologies:  
 - HTML  
 - CSS  
 - Javascript(partially jQuery)  
 - Browser Local Storage  
 - Node.js  
 - Heroku  
 - Meta Weather API https://www.metaweather.com/api/  
 - Random Quotes API https://github.com/lukePeavey/quotable  
 - unsplash API [https://unsplash.com/developers]  
(Source unsplash API [https://source.unsplash.com/] when the access exceeds limit)  


### Getting Started  
Clone team repo by running git clone command in your terminal with the URL from your repo like:  
```
git clone https://github.com/chingu-voyages/v9-toucans-team-05.git  
```

### Project setup
```
npm install
```
( if it does not work,  [npm i node-fetch express ejs dotenv --save])  
then create .env file with following key on your project
```
US_AcsKey = YOUR-UNSPLASH-API-ACCESS-KEY-HERE
```

(If you want to hide key, you should set environment variable on heroku.)
```
heroku config:set US_AcsKey = YOUR-UNSPLASH-API-ACCESS-KEY-HERE
```
### To run
```
npm start
```
