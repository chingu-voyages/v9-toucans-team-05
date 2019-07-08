$(function() {
  $("#ChooseSearch,#SearchAngle").on("click", function() {
    if ($(this).hasClass("active")) {
      $(".active").removeClass("active");
      $("#Search-engine-modal").hide();
    } else {
      $(this).addClass("active");
      $("#Search-engine-modal").show();
    }
  });

  $(".searchtype").on("click", function() {
    var id = $(this).attr("id");
    switch (id) {
      case "bing":
        $("#cse-search-box").attr("action", "https://www.bing.com/");
        $("#ChooseSearch").attr(
          "src",
          "./img/logo/bing_icon-icons.com_62711.svg"
        );
        break;
      case "google":
        $("#cse-search-box").attr("action", "http://google.com/cse");
        $("#ChooseSearch").attr(
          "src",
          "./img/logo/1492616990-1-google-search-logo-engine-service-suits_83412.svg"
        );
        break;
      case "DuckDuckGo":
        $("#cse-search-box").attr("action", "http://duckduckgo.com/");
        $("#ChooseSearch").attr(
          "src",
          "./img/logo/DuckDuckGo_icon-icons.com_67089.svg"
        );
        break;
    }
    $(".active").removeClass("active");
    $("#Search-engine-modal").hide();
    $("#search-input").focus();
  });
});
