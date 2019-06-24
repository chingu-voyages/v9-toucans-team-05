var savedQuote = window.localStorage.getItem('quote');
var savedAuthor = window.localStorage.getItem('author');
var day = new Date();
var quoteDay = day.getDate() + "/" + (day.getMonth() + 1 );


$(document).ready(function() {
  if ("quote" in localStorage) {
    $('.quote').text(savedQuote);
    $('.author').text(savedAuthor);
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

// Clear localStorage from quote on new day -> one quote per day
var savedQuoteDay = window.localStorage.getItem('quote-day');
var now = day.getDate() + "/" + (day.getMonth() + 1 );

function deleteFocus() {
  if (savedQuoteDay != now) {
    localStorage.removeItem('quote');
    localStorage.removeItem('author');
  }
}
deleteFocus();
