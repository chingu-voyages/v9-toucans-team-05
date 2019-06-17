
// Show/hide custom links
$('.links').click(function(){
  $('.custom-links-container').toggle();
});

$('.add-new-link').click(function(){
  $('.add-new-link').remove();
  $('.link-list').append('<li><input type="text" id="idea" placeholder="Name"></li><li><input type="text" id="idea" placeholder="URL"></li>');
});
