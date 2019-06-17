
// Show/hide custom links
$('.links').click(function(){
  $('.custom-links-container').toggle();
});

$(document).on('click', '.add-new-link', function() {
  $('.add-new-link').remove();
  $('.link-list').append('<li><form class="link-form"><input class="input-link" type="text" id="idea" placeholder="Name" onsubmit="return false"><button type="button" class="remove"><i class="icon ion-md-close"></i></button><br><input class="input-link" type="text" id="idea" placeholder="URL"></form></li>');
});

$(document).on('click', '.remove', function() {
  $('.link-form').remove();
  $('.link-list').append($('<li class="add-new-link">New Link</li>'));
});

$('.link-list').on("keypress", function(e){
    if(e.which == 13){
        alert("You've pressed the enter key!");
    }
});
