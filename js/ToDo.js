var list = document.querySelector("#TDlist-box"),
  form = document.querySelector("#ToDoForm"),
  item = document.querySelector("#TDitem"),
  click = document.querySelector("#TDClick"),
  typeSelect = document.querySelector("#conf-i"),
  TDtypeChoices = document.querySelector("#TDtype-choice-Box"),
  TDtypeChoice = document.querySelectorAll(".TDtypeChoice"),
  TDBox = document.querySelector("#ToDo-box"),
  TDtype = `TD_${document.querySelector("#TDtype").innerText}`,
  i = 0;
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
    //Check if TDitems is not 0
    var i = Object.keys(TDitems).length;
    if (i == 0 || document.querySelector("#TD_New_Box") !== null) {
      list.innerHTML = "";
    }
    //Setting up Storage name(Skip if exists)
    i++;
    var d = new Date(),
      dd = ("0" + d.getDate()).slice(-2),
      mm = ("0" + (d.getMonth() + 1)).slice(-2),
      TDBase = TDtype + mm + dd + "_",
      TDkey = TDBase + i;
    while (TDitems[TDkey]) {
      TDkey = TDBase + i;
      if (Object.keys(TDitems).indexOf(TDkey) >= 0) {
        i++;
      }
    }
    var MoveToToday =
      '<p class="DelModalItem" onclick="mvToday(this.parentNode)">Move to Today</p>';
    if (TDtype == "TD_Today") {
      MoveToToday = "";
    }

    //Store Key&Item
    TDitems[TDkey] = [item.value, false];
    list.innerHTML +=
      '<div class="custom-control custom-checkbox d-flex TDValue"><input type="checkbox" name =' +
      TDtype +
      ' class="custom-control-input ' +
      TDtype +
      '" id=' +
      TDkey +
      ' onclick="chItem(this.id)"> <label class="custom-control-label TDcontent" for=' +
      TDkey +
      ">" +
      item.value +
      '</label><div class="itemOptModal" style="display:none"><p class="DelModalItem" onclick="editItem(this.parentNode)">Edit</p>' +
      MoveToToday +
      '<p class="DelModalItem" onclick="rmTD()">Delete Selected</p>' +
      '<p class="DelModalItem" onclick="rmItem(this.parentNode)">Delete</p></div><i class="fa fa-ellipsis-h itemOpt" onclick="itemOptModalToggle(this.previousElementSibling)" style="display:none"></i></div>';
    item.value = "";
    setitemOpt();
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
    if (TDtype == "TD_Inbox") {
      FirstTodo();
    } else {
      list.innerHTML = "";
    }
  } else {
    TDitems = JSON.parse(localStorage.getItem(TDtype));
    setTimeout(setValues, 100);
  }
}

//Show ToDo lists
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

//Show Type Select
typeSelect.addEventListener(
  "click",
  function() {
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

//Remove ToDo lists(multiple)
function rmTD() {
  var del = [];
  // Set up variable to load TDlist names dynamically
  var TDLists = document.getElementsByName(TDtype);
  //Get Keys&Number of the item to delete
  for (var i = 0; i < TDLists.length; i++) {
    if (TDLists[i].checked) {
      del.push(Object.keys(TDitems)[i]);
    }
  }
  //Make Associative Array named "Done"
  if (TDtype !== "TD_Done") {
    done = {};
    del.map(function(i) {
      TDitems[i][1] = true;
      done[i] = TDitems[i];
    });
    if (localStorage.getItem("TD_Done")) {
      var DoneList = JSON.parse(localStorage.getItem("TD_Done"));
      Object.assign(done, DoneList);
    }
    localStorage.setItem("TD_Done", JSON.stringify(done));
  }
  //If AllLists checked, delete all
  if (del.length == document.TDListbox.length) {
    localStorage.removeItem(TDtype);
    list.innerHTML = "";
    TDitems = {};
    if (TDtype == "TD_Inbox") {
      FirstTodo();
    }
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
  //remove style(height) which is set on itemOptModalToggle
  document.getElementById("TDlist-box").style.height = "";
}

function itemOptModalToggle(v) {
  var TDlistBox = document.getElementById("TDlist-box");
  if (v.style.display == "none") {
    v.style.display = "table";
    TDlistBox.style.height = TDlistBox.scrollHeight + "px";
  } else {
    v.style.display = "none";
    TDlistBox.style.height = "";
  }
}

function setitemOpt() {
  var TDValue = document.querySelectorAll(".TDValue"),
    itemOpt = document.querySelectorAll(".itemOpt");
  function itemOptShow(i) {
    itemOpt[i].style.display = "inline";
  }
  function itemOptHide(i) {
    itemOpt[i].style.display = "none";
  }

  for (var i = 0; i < TDValue.length; i++) {
    (function(i) {
      TDValue[i].addEventListener(
        "mouseover",
        function() {
          itemOptShow(i);
        },
        false
      );
      TDValue[i].addEventListener(
        "mouseleave",
        function() {
          itemOptHide(i);
        },
        false
      );
    })(i);
  }
}

function chItem(v) {
  TDitems[v][1] = !TDitems[v][1];
  store();
}

// functions in itemOptModal
function editItem(v) {
  v.previousElementSibling.contentEditable = true;
  v.style.display = "none";
  document.getElementById("TDlist-box").style.height = "";
  var TDkey = v.previousElementSibling.htmlFor;
  //remove htmlFor value to disable label value clickable
  v.previousElementSibling.htmlFor = "";
  v.previousElementSibling.style =
    "background-color: rgba(90, 90, 90, 0.8); width:90%";
  v.previousElementSibling.focus();
  //check keyCode 13(=Enter key) to end this contentEdit
  v.previousElementSibling.addEventListener(
    "keydown",
    function(e) {
      if (e.keyCode == 13) {
        TDitems[TDkey][0] = v.previousElementSibling.innerText;
        store();
        v.previousElementSibling.contentEditable = false;
        v.previousElementSibling.style = "";
        v.previousElementSibling.htmlFor = TDkey;
      }
    },
    false
  );
}

// move to Today
function mvToday(v) {
  var TodayContent = v.previousElementSibling.innerText,
    TDkey = v.previousElementSibling.htmlFor,
    TDToday = JSON.parse(localStorage.getItem("TD_Today"));
  v.parentNode.remove();
  if (!TDToday) {
    var TDToday = {};
  }
  TDToday[TDkey] = [TodayContent, false];
  delete TDitems[TDkey];
  localStorage.setItem("TD_Today", JSON.stringify(TDToday));
  if (TDtype == "TD_Inbox" && Object.keys(TDitems).length == 0) {
    localStorage.removeItem(TDtype);
    FirstTodo();
  } else {
    store();
  }
  //remove style which is set on itemOptModalToggle
  document.getElementById("TDlist-box").style.height = "";
}

// remove 1 item
function rmItem(v) {
  var RDkey = v.previousElementSibling.htmlFor;
  if (TDtype !== "TD_Done") {
    if (localStorage.getItem("TD_Done")) {
      var TDdone = JSON.parse(localStorage.getItem("TD_Done"));
      TDitems[RDkey][1] = true;
      TDdone[RDkey] = TDitems[RDkey];
    }
    localStorage.setItem("TD_Done", JSON.stringify(TDdone));
  }
  delete TDitems[RDkey];
  v.parentNode.remove();
  if (Object.keys(TDitems).length == 0) {
    localStorage.removeItem(TDtype);
    if (TDtype == "TD_Inbox") {
      FirstTodo();
    }
  } else {
    store();
  }
  //remove style(height) which is set on itemOptModalToggle
  document.getElementById("TDlist-box").style.height = "";
}

//set TDitems Values with HTML / JS
function setValues(TDkey) {
  if (!TDitemHTML) {
    var TDitemHTML = "";
    if (TDtype == "TD_Today") {
      if (!TDmvToInbox) {
        var TDmvToInbox = {};
      }
    }
    for (TDkey in TDitems) {
      var checked = "",
        MoveToToday =
          '<p class="DelModalItem" onclick="mvToday(this.parentNode)">Move to Today</p>';
      if (TDitems[TDkey][1] == true) {
        checked = "checked";
      }
      if (TDtype == "TD_Today") {
        MoveToToday = "";
        //Check if the item is today
        var d = new Date(),
          dd = ("0" + d.getDate()).slice(-2),
          mm = ("0" + (d.getMonth() + 1)).slice(-2);
        if (TDkey.slice(8, -2) !== mm + dd) {
          if (TDitems[TDkey][1] == true) {
            TDitems[TDkey][1] = false;
          }
          TDmvToInbox[TDkey] = TDitems[TDkey];
          delete TDitems[TDkey];
          continue;
        }
      }
      TDitemHTML +=
        '<div class="custom-control custom-checkbox d-flex TDValue"><input type="checkbox" name =' +
        TDtype +
        ' class="custom-control-input ' +
        TDtype +
        '" ' +
        checked +
        " id=" +
        TDkey +
        ' onclick="chItem(this.id)"><label class="custom-control-label TDcontent" for=' +
        TDkey +
        ">" +
        TDitems[TDkey][0] +
        '</label><div class="itemOptModal" style="display:none" ><p class="DelModalItem" onclick="editItem(this.parentNode)">Edit</p>' +
        MoveToToday +
        '<p class="DelModalItem" onclick="rmTD()">Delete Selected</p>' +
        '<p class="DelModalItem" onclick="rmItem(this.parentNode)">Delete</p></div><i class="fa fa-ellipsis-h itemOpt" onclick="itemOptModalToggle(this.previousElementSibling)" style="display:none"></i></div>';
    }
    if (TDtype == "TD_Today") {
      if (Object.keys(TDmvToInbox).length !== 0) {
        if (localStorage.getItem("TD_Inbox") !== null) {
          var LSInbox = JSON.parse(localStorage.getItem("TD_Inbox"));
          Object.assign(LSInbox, TDmvToInbox);
        }
        localStorage.setItem("TD_Inbox", JSON.stringify(TDmvToInbox));
        store();
      } else {
        delete TDmvToInbox;
      }
    }
  }
  list.innerHTML = TDitemHTML;
  setitemOpt();
}
