
// Save focus with ENTER
$('.focus').on("keypress", function(e){
    if(e.which == 13){
      var inputFocus = $('.focus').val();
      $('.focus').remove();
      $('.what').remove();
      $('.Focus-for-the-day').append('<div class="todays-focus"><div>TODAY</div><div>' + inputFocus + '</div></div>');
      window.localStorage.focus = $('.todays-focus').html();
    }
});

// Restore user input
var savedFocus = window.localStorage.getItem('focus');

$(document).ready(function() {
  if ("focus" in localStorage) {
  $('.Focus-for-the-day').html(savedFocus);
  $('.focus').remove();
  $('.what').remove();
  }
});

// Hover over focus
$(document).on('mouseover', '.todays-focus',function() {
    $('.todays-focus').prepend('');
    $(this).append('<span class="remove-focus"><i class="icon ion-md-close"></i></span>');
});

$(document).on('mouseout', '.todays-focus',function() {
    $('.checkbox').remove();
});
