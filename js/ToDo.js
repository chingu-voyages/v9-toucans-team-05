var list = document.querySelector("#TDlist-box"),
  form = document.querySelector("#ToDoForm"),
  item = document.querySelector("#TDitem"),
  click = document.querySelector("#TDClick"),
  typeSelect = document.querySelector("#conf-i"),
  TDtypeChoices = document.querySelector("#TDtype-choice-Box"),
  TDBox = document.querySelector("#ToDo-box"),
  TDtype = `TD_${document.querySelector("#TDtype").innerText}`,
  i = 0,
  d = new Date(),
  dd = ("0" + d.getDate()).slice(-2),
  mm = ("0" + d.getMonth()).slice(-2),
  TDBase = TDtype + mm + dd + "_",
  TDkey = TDBase + i;
if (!localStorage.getItem(TDtype)) {
  var TDitems = {};
} else {
  TDitems = JSON.parse(localStorage.getItem(TDtype));
}

form.addEventListener(
  "submit",
  function(e) {
    e.stopPropagation();
    e.preventDefault();
    //Setting up Storage name(Skip if exists)
    i++;
    while (TDitems[TDkey]) {
      TDkey = TDBase + i;
      if (Object.keys(TDitems).indexOf(TDkey) >= 0) {
        i++;
      }
    }
    //Store Key&Item
    TDitems[TDkey] = item.value;
    list.innerHTML +=
      '<div class="custom-control custom-checkbox TDValue"><input type="checkbox" name =' +
      TDtype +
      ' class="custom-control-input ' +
      TDtype +
      '" id=' +
      TDkey +
      '> <label class="custom-control-label TDcontent" for=' +
      TDkey +
      ">" +
      item.value +
      "</label></div>";

    item.value = "";
    store();
  },
  false
);

click.addEventListener(
  "click",
  function() {
    if (!click.classList.contains("active")) {
      getValues();
      TDBox.style.display = "table";
      click.classList.add("active");
    } else {
      TDBox.style.display = "none";
      click.classList.remove("active");
    }
  },
  false
);

typeSelect.addEventListener(
  "click",
  function() {
    rmTD();
    if (!typeSelect.classList.contains("active")) {
      TDtypeChoices.style.display = "table";
      typeSelect.classList.add("active");
    } else {
      TDtypeChoices.style.display = "none";
      typeSelect.classList.remove("active");
    }
  },
  false
);

function store() {
  localStorage.setItem(TDtype, JSON.stringify(TDitems));
}

function rmTD() {
  var del = [];
  if (document.TDInbox.length !== 1) {
    //Get Keys&Number of the item to delete
    for (var i = 0; i < document.TDInbox.TD_Inbox.length; i++) {
      if (document.TDInbox.TD_Inbox[i].checked) {
        console.log(i);
        del.push(Object.keys(TDitems)[i]);
      }
    }
    // Delete from HTML
    del.map(function(i) {
      var v = document.getElementById(i);
      v.parentNode.remove();
    });
    //Make Associative Array named "Done"
    done = {};
    del.map(function(i) {
      return (done[i] = TDitems[i]);
    });
    //Delete from TDitems
    del.map(function(i) {
      return delete TDitems[i];
    });
    store();
  } else {
    if (document.TDInbox.TD_Inbox.checked) {
      var v = document.getElementsByClassName("TDValue");
      v[0].remove();
      localStorage.removeItem(TDtype);
      TDitems = {};
    }
  }
}

function getValues() {
  if (!TDitemHTML) {
    var TDitemHTML = "";
    for (TDkey in TDitems) {
      TDitemHTML +=
        '<div class="custom-control custom-checkbox TDValue"><input type="checkbox" name =' +
        TDtype +
        ' class="custom-control-input ' +
        TDtype +
        '" id=' +
        TDkey +
        '><label class="custom-control-label TDcontent" for=' +
        TDkey +
        ">" +
        TDitems[TDkey] +
        "</label></div>";
    }
  }
  list.innerHTML = TDitemHTML;
}
