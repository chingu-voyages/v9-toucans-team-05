$(function() {
  $("#ChooseSearch,#SearchAngle").on("click touchend", function() {
    if ($("#ChooseSearch,#SearchAngle").hasClass("active")) {
      $(".active").removeClass("active");
      $("#Search-engine-modal").hide();
    } else {
      $("#ChooseSearch,#SearchAngle").addClass("active");
      $("#Search-engine-modal").show();
      $("#search-input").focus();
    }
  });
  $(document).on('click touchend', function(e) {
    if (!$(e.target).closest('#ChooseSearch,#SearchAngle').length) {
      $(".active").removeClass("active");
      $("#Search-engine-modal").hide();
    }
  });
  $(".searchtype").on("click touchend", function() {
    var id = $(this).attr("id");
    switch (id) {
      case "bing":
        $("#cse-search-box").attr("action", "https://www.bing.com/");
        $("#ChooseSearch").attr(
          "src",
          "./static/logo/bing_icon-icons.com_62711.svg"
        );
        break;
      case "google":
        $("#cse-search-box").attr("action", "http://google.com/cse");
        $("#ChooseSearch").attr(
          "src",
          "./static/logo/1492616990-1-google-search-logo-engine-service-suits_83412.svg"
        );
        break;
      case "DuckDuckGo":
        $("#cse-search-box").attr("action", "http://duckduckgo.com/");
        $("#ChooseSearch").attr(
          "src",
          "./static/logo/DuckDuckGo_icon-icons.com_67089.svg"
        );
        break;
    }
    $(".active").removeClass("active");
    $("#Search-engine-modal").hide();
    $("#search-input").focus();
  });
});
