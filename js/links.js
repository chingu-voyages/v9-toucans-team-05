
// Show/hide custom links
$('.links').click(function(){
  $('.custom-links-container').toggle();
});

// Close on click outside the container
/*$(document).mouseup(function (e) {
   if (!$('.custom-links-container').is(e.target) && $('.custom-links-container').has(e.target).length === 0) {
     $('.custom-links-container').hide();
  }
});*/

// Add input fields
$(document).on('click', '.add-new-link', function() {
  $('.add-new-link').remove();
  $('.link-list').append('<li><form class="link-form"><input class="input-name" type="text" id="idea" placeholder="Name" onsubmit="return false"><span class="remove"><i class="icon ion-md-close"></i></span><br><input class="input-link" type="text" id="idea" placeholder="URL"></form></li>');
});

// Remove input field
$(document).on('click', '.remove', function() {
  $('.link-form').remove();
  $('.link-list').append($('<li class="add-new-link">New Link</li>'));
});

// Save changes with ENTER
var inputURL;
var inputName;

$('.link-list').on("keypress", function(e){
    if(e.which == 13){
      inputName = $('.input-name').val();
      inputURL = $('.input-link').val();
      $('.link-form').remove();
      $('.link-list').append($('<li class="user-input"><a href="https://' + inputURL + '">' + inputName + ' </a><span class="remove-link"><i class="icon ion-md-close"></i></span></li>'));
      $('.link-list').append($('<li class="add-new-link">New Link</li>'));
      window.localStorage.links = $('.link-list').html();
    }
});

// Save and retrieve user input when browser refreshes
var savedLinks = window.localStorage.getItem('links');

$(document).ready(function() {
  if ("links" in localStorage) {
  $('.link-list').html(savedLinks);
  }
});

// Delete link
$(document).on('click', '.remove-link', function() {
  this.parentElement.remove();
  localStorage.removeItem('links');
  window.localStorage.links = $('.link-list').html();
});
