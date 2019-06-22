var list = document.querySelector("#TDlist-box"),
  form = document.querySelector("#ToDoForm"),
  item = document.querySelector("#TDitem"),
  click = document.querySelector("#TDClick"),
  typeSelect = document.querySelector("#conf-i"),
  TDtypeChoices = document.querySelector("#TDtype-choice-Box"),
  TDtypeChoice = document.querySelectorAll(".TDtypeChoice"),
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

//Add new Task to the list
form.addEventListener(
  "submit",
  function(e) {
    e.stopPropagation();
    e.preventDefault();
    //Setting up Storage name(Skip if exists)
    if (i == 0) {
      list.innerHTML = "";
    }
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

function FirstTodo() {
  list.innerHTML =
    '<div id="TD_New_Box">' +
    '<h5 class="TD_New_title">Add a todo to get started</h5>' +
    '<p class="TD_Today_link">Switch to Today <i class="fa fa-angle-right"></i></p>' +
    '<button id="TD_New_btn">New Todo</button>' +
    "</div>";
  var TD_New_Box = document.querySelector("#TD_New_Box"),
    TD_GoTo_Today = document.querySelector(".TD_Today_link");
  TD_New_Box.addEventListener(
    "click",
    function(e) {
      e.stopPropagation();
      e.preventDefault();
      list.innerHTML = "";
    },
    false
  );
  TD_GoTo_Today.addEventListener(
    "click",
    function(e) {
      LoadTDtype("Today");
    },
    false
  );
}

function LoadTDtype(type) {
  document.querySelector("#TDtype").innerText = type;
  TDtype = `TD_${document.querySelector("#TDtype").innerText}`;
  if (!localStorage.getItem(TDtype)) {
    TDitems = {};
  } else {
    TDitems = JSON.parse(localStorage.getItem(TDtype));
  }
  setTimeout(setValues, 100);
}

click.addEventListener(
  "click",
  function() {
    if (!click.classList.contains("active")) {
      setValues();
      TDBox.style.display = "table";
      click.classList.add("active");
      if (!localStorage.getItem(TDtype)) {
        FirstTodo();
      } else {
        TDitems = JSON.parse(localStorage.getItem(TDtype));
      }
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
    if (localStorage.getItem(TDtype)) {
      rmTD();
    }
    if (!typeSelect.classList.contains("active")) {
      TDtypeChoices.style.display = "table";
      typeSelect.classList.add("active");
    } else {
      TDtypeChoices.style.display = "none";
      typeSelect.classList.remove("active");
    }
    for (var i = 0; i < TDtypeChoice.length; i++) {
      TDtypeChoice[i].addEventListener(
        "click",
        function() {
          document.querySelector("#TDtype").innerText = this.innerText;
          LoadTDtype(this.innerText);
          TDtypeChoices.style.display = "none";
          typeSelect.classList.remove("active");
        },
        false
      );
    }
  },
  false
);

function store() {
  localStorage.setItem(TDtype, JSON.stringify(TDitems));
}

function rmTD() {
  var del = [];
  if (document.TDListbox.length !== 1) {
    // Set up variable to load TDlist names dynamically
    var TDLists = eval(`document.TDListbox.${TDtype}`);
    //Get Keys&Number of the item to delete
    for (var i = 0; i < eval(TDLists.length); i++) {
      if (TDLists[i].checked) {
        console.log(i);
        del.push(Object.keys(TDitems)[i]);
      }
    }
    //Make Associative Array named "Done"
    done = {};
    del.map(function(i) {
      return (done[i] = TDitems[i]);
    });

    //If AllLists checked, delete all
    if (del.length == document.TDListbox.length) {
      localStorage.removeItem(TDtype);
      list.innerHTML = "";
      TDitems = {};
    } else {
      // Delete from HTML
      del.map(function(i) {
        var v = document.getElementById(i);
        v.parentNode.remove();
      });
      //Delete from TDitems
      del.map(function(i) {
        return delete TDitems[i];
      });
      store();
    }
  } else {
    if (document.TDInbox.TD_Inbox.checked) {
      var v = document.getElementsByClassName("TDValue");
      v[0].remove();
      localStorage.removeItem(TDtype);
      FirstTodo();
      TDitems = {};
    }
  }
}

function setValues(TDkey) {
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
