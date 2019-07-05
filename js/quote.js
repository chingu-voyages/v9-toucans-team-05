var savedQuote = window.localStorage.getItem('quote');
var savedAuthor = window.localStorage.getItem('author');
var savedHeart = window.localStorage.getItem('heart');
var savedQuotes = window.localStorage.getItem('likedQuotes');

var day = new Date();
var quoteDay = day.getDate() + "/" + (day.getMonth() + 1 );


$(document).ready(function() {
  if ("quote" in localStorage) {
    $('.quote').text(savedQuote);
    $('.author').text(savedAuthor);
    $('.twitter a').attr('href', ($('.twitter a').attr('href') + savedQuote + '  —  ' + savedAuthor));
    if("heart" in localStorage) {
      $('.heart').html(savedHeart);
    } else {
      $('.heart').html('<i class="far fa-heart like">');
    }
  } else {
    $.getJSON('https://api.quotable.io/random', function(quote) {
      $('.quote').text('"' + quote.content + '"');
      $('.author').text(quote.author);
      $('.twitter a').attr('href', ($('.twitter a').attr('href') + quote.content + '  —  ' + quote.author));
      window.localStorage.setItem('quote', $('.quote').text());
      window.localStorage.setItem('author', $('.author').text());
      window.localStorage.setItem('quote-day', quoteDay);
    });
  }
});

$(document).ready(function() {
  if ("likedQuotes" in localStorage) {
    $('.liked-quotes-container').html(savedQuotes);
    $('.not-saved').remove();
  } else {
    $('.liked-quotes-container').append("<p class='not-saved' style='color: rgba(237, 237, 237, 0.6)'>You haven't liked any quotes yet</p>");
  }
});

// Clear localStorage from quote on new day -> one quote per day
var savedQuoteDay = window.localStorage.getItem('quote-day');
var now = day.getDate() + "/" + (day.getMonth() + 1 );

function deleteQuote() {
  if (savedQuoteDay != now) {
    localStorage.removeItem('quote');
    localStorage.removeItem('author');
    localStorage.removeItem('heart');
  }
}
deleteQuote();

// Like quote
$(document).on('click', '.like', function() {
  $('.like').removeClass('far like').addClass('fas liked');
  window.localStorage.setItem('heart', $('.heart').html());
  $('.liked-quotes-container').append('<p class="liked-quote">' + $('.quote').text() + ' <span>' + $('.author').text() + ' '+ ' </span><i class="fas fa-heart liked"></i></p><hr>');
  window.localStorage.setItem('likedQuotes', $('.liked-quotes-container').html());
  $('.not-saved').remove();
});

// Remove like
$(document).on('click', '.liked', function() {
  $('.liked').removeClass('fas liked').addClass('far like');
  window.localStorage.removeItem('heart');
  $('.liked-quote:first').remove();
  $('hr:eq(1)').remove();
  window.localStorage.setItem('likedQuotes', $('.liked-quotes-container').html());
  $('.liked-quotes-container').append("<p class='not-saved' style='color: rgba(237, 237, 237, 0.6)'>You haven't liked any quotes yet.</p>");
});

// Hover over quote
$(document).on('mouseover', '.Daily-Quote', function() {
    $('.quote-additional').css('visibility', 'visible');
  });

$(document).on('mouseout', '.Daily-Quote', function() {
    $('.quote-additional').css('visibility', 'hidden');
  });

// View liked quotes
$('.liked-quotes').click(function(){
  $('.liked-quotes-container').fadeToggle();
  var offset = $(this).position();
  var leftTotal = parseInt(offset.left, 10) - 23 +'px';
  $('.liked-quotes-container').css('left', leftTotal);
});

// Hide when clicked outside
$(document).mouseup(function (e){
	if (!$('.liked-quotes-container').is(e.target) && !$('.liked-quotes').is(e.target)  && !$('.liked-quote').is(e.target) && !$('.quote-ellipsis').is(e.target) && !$('.like').is(e.target) && !$('.liked').is(e.target)){
		$('.liked-quotes-container').fadeOut();
  }
});
