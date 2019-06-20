
// Save focus with ENTER
$('.focus').on("keypress", function(e){
    if(e.which == 13){
      var inputFocus = $('.user-focus').val();
      $('.focus').remove();
      $('.what').remove();
      $('.Focus-for-the-day').append('<div class="todays-focus"><ul><li class="today">TODAY</li><li class="focus-line"><i class="far fa-square unchecked"></i><div class="user-focus">' + inputFocus + '</div><span class="remove-focus"><i class="icon ion-md-close"></i></span></li></ul>');
      window.localStorage.setItem('focus', inputFocus);
    }
});

// Restore user input
var savedFocus = window.localStorage.getItem('focus');

$(document).ready(function() {
  if ("focus" in localStorage) {
    $('.focus').remove();
    $('.what').remove();
    $('.Focus-for-the-day').append('<div class="todays-focus"><ul><li class="today">TODAY</li><li class="focus-line"><i class="far fa-square unchecked"></i><div class="user-focus">' + savedFocus + '</div><span class="remove-focus"><i class="icon ion-md-close"></i></span></li></ul>');
  }
});

// Hover over focus
$(document).on('mouseover', '.todays-focus',function() {
    $('.unchecked').css('visibility', 'visible');
    $('.remove-focus').css('visibility', 'visible');
});

$(document).on('mouseout', '.todays-focus',function() {
    $('.unchecked').css('visibility', 'hidden');
    $('.remove-focus').css('visibility', 'hidden');
});

// Delete focus
$(document).on('click', '.remove-focus', function() {
  this.parentElement.remove();
  localStorage.removeItem('focus');
  $('.Focus-for-the-day').append('<div class="what">What is your main focus for today?</div> <input type="text" onsubmit="return false" class="focus">');
});
