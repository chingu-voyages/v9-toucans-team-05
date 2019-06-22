var day = new Date();
var focusDay = day.getDate() + "/" + (day.getMonth() + 1 );

// Save focus with ENTER
$(document).on('keypress', '.focus', function(e){
    if(e.which == 13){
      var inputFocus = '<div class="todays-focus"><ul><li class="today">TODAY</li><li class="focus-line"><i class="far fa-square unchecked"></i><div class="user-focus">' + $('.focus').val() + '</div><span class="remove-focus"><i class="icon ion-md-close icon-close"></i></span></li></ul>';

      $('.focus').remove();
      $('.what').remove();
      $('.Focus-for-the-day').append(inputFocus);
      window.localStorage.setItem('focus', inputFocus);
      window.localStorage.setItem('focus-day', focusDay);
    }
});

// Restore user input
var savedFocus = window.localStorage.getItem('focus');

$(document).ready(function() {
  if ("focus" in localStorage) {
    $('.focus').remove();
    $('.what').remove();
    $('.Focus-for-the-day').append(savedFocus);
  }
});

// Hover over focus
$(document).on('mouseover', '.todays-focus', function() {
    $('.unchecked').css('visibility', 'visible');
    $('.remove-focus').css('visibility', 'visible');
});

$(document).on('mouseout', '.todays-focus', function() {
    $('.unchecked').css('visibility', 'hidden');
    $('.remove-focus').css('visibility', 'hidden');
});

// Delete focus
$(document).on('click', '.remove-focus', function() {
  $('.todays-focus').remove();
  localStorage.removeItem('focus');
  $('.Focus-for-the-day').append('<div class="what">What is your main focus for today?</div><input type="text" onsubmit="return false" class="focus">');
});

// Mark as done
$(document).on('click', '.unchecked', function() {
  $('.unchecked').removeClass('fa-square').addClass('fa-check-square').removeClass('unchecked').css('visibility', 'visible');
  $('.user-focus').css('text-decoration', 'line-through');
  $('.remove-focus').remove();
  $('.focus-line').append('<span class="add-focus"><i class="fas fa-plus"></i></span>');
  var focusDone = '<div class="todays-focus"><ul><li class="today">TODAY</li><li class="focus-line"><i class="far fa-check-square" style="visibility: visible;"></i><div class="user-focus" style="text-decoration: line-through;">' + $('.user-focus').html() + '</div><span class="add-focus"><i class="fas fa-plus"></i></span></li></ul></div>';
  window.localStorage.setItem('focus', focusDone);
});

// Remove done mark
$(document).on('click', '.fa-check-square', function() {
  $('.fa-check-square').removeClass('fa-check-square').addClass('fa-square unchecked');
  $('.user-focus').css('text-decoration', 'none');
  $('.focus-line').append('<span class="remove-focus"><i class="icon ion-md-close icon-close"></i></span>');
  $('.add-focus').remove();
  var focusUndone = '<div class="todays-focus"><ul><li class="today">TODAY</li><li class="focus-line"><i class="far fa-square unchecked"></i><div class="user-focus">' + $('.user-focus').html() + '</div><span class="remove-focus"><i class="icon ion-md-close icon-close"></i></span></li></ul></div>';
  window.localStorage.setItem('focus', focusUndone);
});

// Add new focus
$(document).on('click', '.fa-plus', function() {
  $('.Focus-for-the-day').append('<div class="what">What is your main focus for today?</div><input type="text" onsubmit="return false" class="focus">');
  $('.todays-focus').remove();
  localStorage.removeItem('focus');
});

// Delete focus after 12am
var savedDay = window.localStorage.getItem('focus-day');
var heute = day.getDate() + "/" + (day.getMonth() + 1 );

function deleteFocus() {
  if (savedDay != heute) {
    localStorage.removeItem('focus');
  }
}
deleteFocus();

// Save username with ENTER
$(document).on('keypress', '.user-name', function(e){
    if(e.which == 13){
      var username = $('.user-name').val();
      $('.user-name').remove();
      $('.message').append('<span class="name"> ' + username + '.</span><span class="more"><i class="fas fa-ellipsis-h"></i></span>');
      window.localStorage.setItem('username', username);
    }
});

// Restore username
var savedName = window.localStorage.getItem('username');

$(document).ready(function() {
  if ("username" in localStorage) {
    $('.user-name').remove();
    $('.message').append('<span class="name"> ' + savedName + '.</span><span class="more"><i class="fas fa-ellipsis-h"></i></span>');
  }
});

// Hover over username
$(document).on('mouseover', '.message', function() {
    $('.more').css('visibility', 'visible');
  });

$(document).on('mouseout', '.message', function() {
  if( $('.settings').css('display') == 'block') {
    $('.more').css('visibility', 'visible');
    $('.more').css('background-color', 'rgba(79, 79, 81, 0.5)');
  } else {
    $('.more').css('visibility', 'hidden');
  }
  });

// Click on more
$(document).on('click', '.more', function() {
  $('.settings').fadeToggle();
});

// Click on edit
$(document).on('click', '.edit-name', function() {
  $('.settings').fadeToggle();
  $('.more').remove();
  $('.name').remove();
  $('.Welcome-message').append('<input type="text" onsubmit="return false" class="user-name" placeholder="[your name]">');
});
