var savedQuote = window.localStorage.getItem('quote');
var savedAuthor = window.localStorage.getItem('author');
var savedHeart = window.localStorage.getItem('heart');
var savedQuotes = window.localStorage.getItem('likedQuotes')

var day = new Date();
var quoteDay = day.getDate() + "/" + (day.getMonth() + 1 );


$(document).ready(function() {
  if ("quote" in localStorage) {
    $('.quote').text(savedQuote);
    $('.author').text(savedAuthor);
    if("heart" in localStorage) {
      $('.heart').html(savedHeart);
    } else {
      $('.heart').html('<i class="far fa-heart like">');
    }
  } else {
    $.getJSON('https://api.quotable.io/random', function(quote) {
      $('.quote').text('"' + quote.content + '"');
      $('.author').text(quote.author);
      window.localStorage.setItem('quote', $('.quote').text());
      window.localStorage.setItem('author', $('.author').text());
      window.localStorage.setItem('quote-day', quoteDay);
    });
  }
});

$(document).ready(function() {
  if ("likedQuotes" in localStorage) {
    $('.liked-quotes-container').html(savedQuotes);
  } else {
    $('.liked-quotes-container').append("<p style='color: rgba(237, 237, 237, 0.6)'>You haven't liked any quotes yet</p>");
  }
});

// Clear localStorage from quote on new day -> one quote per day
var savedQuoteDay = window.localStorage.getItem('quote-day');
var now = day.getDate() + "/" + (day.getMonth() + 1 );

function deleteQuote() {
  if (savedQuoteDay != now) {
    localStorage.removeItem('quote');
    localStorage.removeItem('author');
    localStorage.removeItem('heart')
  }
}
deleteQuote();

// Like quote
$(document).on('click', '.like', function() {
  $('.fa-heart').removeClass('far like').addClass('fas liked');
  window.localStorage.setItem('heart', $('.heart').html());
  $('.liked-quotes-container').append($('.quote').text() + ' ' + $('.author').text() + ' <i class="fas fa-heart"></i><hr>');
  window.localStorage.setItem('likedQuotes', $('.liked-quotes-container').html());
});

// Tweet quote
$(document).ready(function() {
  $('.twitter a').attr('href', ($('.twitter a').attr('href') + savedQuote + '  —  ' + savedAuthor));
});

// View liked quotes
$('.liked-quotes').click(function(){
  $('.liked-quotes-container').slideToggle();
})
