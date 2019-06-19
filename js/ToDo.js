var list = document.querySelector("#TDlist-box"),
  form = document.querySelector("#ToDoForm"),
  item = document.querySelector("#TDitem"),
  click = document.querySelector("#TDClick"),
  TDBox = document.querySelector("#ToDo-box"),
  TDtype = `TD_${document.querySelector("#TDtype").innerText}`,
  TDitems = JSON.parse(localStorage.getItem(TDtype)),
  i = document.querySelectorAll(".TDValue").length;

form.addEventListener(
  "submit",
  function(e) {
    e.stopPropagation();
    e.preventDefault();
    i++;
    var d = new Date(),
      dd = ("0" + d.getDate()).slice(-2),
      mm = ("0" + d.getMonth()).slice(-2),
      TDkey = TDtype + mm + dd + "_" + i;
    //Store Key&Item
    TDitems[TDkey] = item.value;

    list.innerHTML +=
      '<div class="custom-control custom-checkbox TDValue"><input type="checkbox" name =' +
      TDtype +
      ' class="custom-control-input" id=' +
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
      TDBox.style.display = "table";
      click.classList.add("active");
    } else {
      TDBox.style.display = "none";
      click.classList.remove("active");
    }
  },
  false
);

function store() {
  localStorage.setItem(TDtype, JSON.stringify(TDitems));
}

function rmTD() {
  var flag = false,
    del = [];
  for (var i = 0; i < document.TDInbox.length; i++) {
    flag = true;
    if (document.TDInbox.TD_Inbox[i].checked) {
      console.log(i);
      del.push(Object.keys(TDitems)[i]);
      var v = document.getElementsByClassName("TDValue")[i];
      v.parentNode.removeChild(v);
    }
  }
  if (!flag) {
    alert("Nothing Deleted!");
  } else {
    Dlitems = TDitems;
    for (Dlitems in del) {
      delete TDitems[del];
    }
    store();
  }
}

function getValues() {
  if (!TDitems) {
    list.innerHTML =
      '<div class="custom-control custom-checkbox TDValue"><input type="checkbox" name =' +
      TDtype +
      ' class="custom-control-input" id="TDSample1"/> <label class="custom-control-label TDcontent" for="TDitemNum1"> Make a ToDo List</label></div>';
  } else {
    for (TDkey in TDitems) {
      list.innerHTML +=
        '<div class="custom-control custom-checkbox TDValue"><input type="checkbox" name =' +
        TDtype +
        ' class="custom-control-input" id=' +
        TDkey +
        '><label class="custom-control-label TDcontent" for=' +
        TDkey +
        ">" +
        TDitems[TDkey] +
        "</label></div>";
    }
  }
}
getValues();
