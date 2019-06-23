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
      '</label><i class="fa fa-ellipsis-h itemOpt" style="display:none"></i></div>';

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
  // Set up variable to load TDlist names dynamically
  var TDLists = document.getElementsByName(TDtype);
  //Get Keys&Number of the item to delete
  for (var i = 0; i < TDLists.length; i++) {
    if (TDLists[i].checked) {
      console.log(i);
      del.push(Object.keys(TDitems)[i]);
    }
  }
  //Make Associative Array named "Done"
  done = {};
  del.map(function(i) {
    done[i] = TDitems[i];
  });
  if (localStorage.getItem("TD_Done")) {
    var DoneList = JSON.parse(localStorage.getItem("TD_Done"));
    Object.assign(done, DoneList);
  }
  localStorage.setItem("TD_Done", JSON.stringify(done));

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
}

function setValues(TDkey) {
  if (!TDitemHTML) {
    var TDitemHTML = "";
    for (TDkey in TDitems) {
      TDitemHTML +=
        '<div class="custom-control custom-checkbox d-flex TDValue"><input type="checkbox" name =' +
        TDtype +
        ' class="custom-control-input ' +
        TDtype +
        '" id=' +
        TDkey +
        '><label class="custom-control-label TDcontent" for=' +
        TDkey +
        ">" +
        TDitems[TDkey] +
        '</label><i class="fa fa-ellipsis-h itemOpt" style="display:none"></i></div>';
    }
  }
  list.innerHTML = TDitemHTML;
}

/*
var TDValue = document.querySelectorAll(".TDValue"),
  itemOpt = document.querySelectorAll(".itemOpt");
Del_i = [];
for (var i = 0; i < TDValue.length; i++) {
  Del_i[
    i
  ] = `TDValue[${i}].addEventListener("mouseover",function() {itemOpt[${i}].style.display="inline"},false);TDValue[${i}].addEventListener("mouseleave",function() {itemOpt[${i}].style.display="none"},false);`;
}
for (var i = 0; i < Del_i.length; i++) {
  eval(Del_i[i]);
}

itemOpt[1].addEventListener("click", function() {
  TDValue[1].innerHTML +=
    '<div id="itemOptModal"><p class="DelModalItem">Edit</p><p class="DelModalItem">Move to Today</p><p class="DelModalItem">Move to...</p><p class="DelModalItem">Delete</p></div>';
});
itemOpt[0].addEventListener("click", function() {
  TDValue[0].innerHTML +=
    '<div id="itemOptModal"><p class="DelModalItem">Edit</p><p class="DelModalItem">Move to Today</p><p class="DelModalItem">Move to...</p><p class="DelModalItem">Delete</p></div>';
});
*/
