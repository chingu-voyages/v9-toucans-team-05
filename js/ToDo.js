var list = document.querySelector("#TDlist-box"),
  form = document.querySelector("#ToDoForm"),
  item = document.querySelector("#TDitem"),
  click = document.querySelector("#TDClick"),
  typeSelect = document.querySelector("#conf-i"),
  TDtypeChoices = document.querySelector("#TDtype-choice-Box"),
  TDtypeChoice = document.querySelectorAll(".TDtypeChoice"),
  TDBox = document.querySelector("#ToDo-box"),
  TDtype = `TD_${document.querySelector("#TDtype").innerText}`,
  TDlistBox = document.getElementById("TDlist-box"),
  i = 0,
  MoveTo='';
if (!localStorage.getItem(TDtype)) {
  var TDitems = {};
} else {
  TDitems = JSON.parse(localStorage.getItem(TDtype));
}

//replace strings to escape XSS
function escXSS(s) {
  s = s.replace(/&/g, '&amp;'),
  s = s.replace(/</g, '&lt;'),
  s = s.replace(/>/g, '&gt;'),
  s = s.replace(/"/g, '&quot;'),
  s = s.replace(/'/g, '&#39;');
  return s;
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
    //set Validation
    if(!item.value){
      alert("oh, you did not input task...awesome!! \n if you don't have any, afk and enjoy the rest of your day!")
      return false;
    }
    item.value = escXSS(item.value);
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
    if(TDtype == "TD_Inbox"){
      MoveTo ='<p class="DelModalItem" onclick="mvToDir(this.parentNode ,&quot;TD_Today&quot;)">Move to Today</p>'+
              '<p class="DelModalItem" onclick="mvToDir(this.parentNode,&quot;TD_Done&quot;)">Move to Done</p>';
    }
    if(TDtype == "TD_Today"){
      MoveTo ='<p class="DelModalItem" onclick="mvToDir(this.parentNode ,&quot;TD_Inbox&quot;)">Move to Inbox</p>'+
              '<p class="DelModalItem" onclick="mvToDir(this.parentNode,&quot;TD_Done&quot;)">Move to Done</p>';
    }      

    //Store Key&Item
    if (TDtype=="TD_Done"){
      MoveTo ='<p class="DelModalItem" onclick="mvToDir(this.parentNode ,&quot;TD_Inbox&quot;)">Move to Inbox</p>'+
              '<p class="DelModalItem" onclick="mvToDir(this.parentNode,&quot;TD_Today&quot;)">Move to Today</p>';
      TDitems[TDkey] = [item.value, true];
      checked='checked';
    }else{
      TDitems[TDkey] = [item.value, false];
      checked='';
    }
    list.innerHTML +=
      '<div class="custom-control custom-checkbox d-flex TDValue"><input type="checkbox" name =' +
      TDtype +
      ' class="custom-control-input ' +
      TDtype +
      '" ' +
      checked +
      " id=" +
      TDkey +
      ' onclick="chItem(this.id)"> <label class="custom-control-label TDcontent" for=' +
      TDkey +
      ">" +
      item.value +
      '</label><div class="itemOptModal"><p class="DelModalItem" onclick="editItem(this.parentNode)">Edit</p>' +
      MoveTo +
      '<p class="DelModalItem" onclick="rmTD(this.parentNode)">Delete Selected</p>' +
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
  TDtype = `TD_${type}`;
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
    if (!TDBox.classList.contains("TDactive")) {
      setValues();
      TDBox.classList.add("TDactive");
      if (!localStorage.getItem(TDtype)) {
        if(TDtype == "TD_Inbox"){
          FirstTodo();
        }
      } else {
        TDitems = JSON.parse(localStorage.getItem(TDtype));
      }
    } else {
      TDBox.classList.remove("TDactive");
    }
    TDlistBox.style.height = "";
  },
  false
);

//Show Type Select
typeSelect.addEventListener(
  "click",
  function() {
    if (!TDtypeChoices.classList.contains("TDtypeActive")) {
      TDtypeChoices.classList.add("TDtypeActive");
    } else {
      TDtypeChoices.classList.remove("TDtypeActive");
    }
    for (var i = 0; i < TDtypeChoice.length; i++) {
      TDtypeChoice[i].addEventListener(
        "click",
        function() {
          document.querySelector("#TDtype").innerText = this.innerText;
          LoadTDtype(this.innerText);
          TDtypeChoices.classList.remove("TDtypeActive");
          //remove style(height) which is set on itemOptModalToggle
          document.getElementById("TDlist-box").style.height = "";
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
function rmTD(v) {
  var del = [];
  // Set up variable to load TDlist names dynamically
  var TDLists = document.getElementsByName(TDtype),
    TDchecked = {};
  for (TDkey in TDitems) {
    if (TDitems[TDkey][1] == true) {
      TDchecked[TDkey] = TDitems[TDkey][0];
    }
  }
  if (Object.keys(TDchecked).length !== 0) {
    //Get Keys&Number of the item to delete
    for (var i = 0; i < TDLists.length; i++) {
      if (TDLists[i].checked) {
        del.push(Object.keys(TDitems)[i]);
      }
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
        var j = document.getElementById(i);
        j.parentNode.remove();
      });
      //Delete from TDitems
      del.map(function(i) {
        return delete TDitems[i];
      });
      store();
    }
  } else {
    alert("Nothing is Checked! Can you work on tasks?");
    v.style.display = "none";
  }
  //remove style(height) which is set on itemOptModalToggle
  document.getElementById("TDlist-box").style.height = "";
}

//implement "closest" function
function closest(node, selector) {
  return (node.closest || function(_selector) {
    do {
      if ((node.matches || node.msMatchesSelector).call(node, _selector)) {
        return node;
      }
      node = node.parentElement || node.parentNode;
    } while (node !== null && node.nodeType === 1);

    return null;
  }).call(node, selector);
}

function itemOptModalToggle(v) {
  var iOptActive =document.getElementsByClassName("itemOptActive");
  if(closest(v, '.itemOptActive')==null) {
    if(iOptActive.length!==0){
      iOptActive[0].classList.remove('itemOptActive');
      TDlistBox.style.height = "";
    }
    v.classList.add('itemOptActive');
    TDlistBox.style.height = TDlistBox.scrollHeight + "px";
  }else{
    iOptActive[0].classList.remove('itemOptActive');
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
  v.classList.remove('itemOptActive');
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

// move to other Directory
function mvToDir(v,DirToMv) {
  var mvContent = v.previousElementSibling.innerText,
    TDkey = v.previousElementSibling.htmlFor;
    if(JSON.parse(localStorage.getItem(DirToMv))==null){
      DirToMvItems = {};
    }else{
      DirToMvItems = JSON.parse(localStorage.getItem(DirToMv));
    }
  v.parentNode.remove();
  delete TDitems[TDkey];
  var i = 0;
  while (Object.keys(DirToMvItems).indexOf(TDkey) >= 0) {
    if (TDkey.indexOf("_e", 12) >= 0) {
      k_in = TDkey.indexOf("_e", 12);
      TDkey = TDkey.slice(0, k_in);
    }
    TDkey += "_e" + i;
    i++;
  }
  DirToMvItems[TDkey] = (DirToMv == "TD_Done")
                    ?  [mvContent, true]
                    :  [mvContent, false];
  localStorage.setItem(DirToMv, JSON.stringify(DirToMvItems));
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
      if (typeof(TDmvToInbox)=="undefined") {
        var TDmvToInbox = {};
      }
    }
    //Check if the item is today
    var d = new Date(),
    dd = ("0" + d.getDate()).slice(-2),
    mm = ("0" + (d.getMonth() + 1)).slice(-2),
    TDmvToDone = {};
    for (TDkey in TDitems) {
      var checked = "";       
      if (TDitems[TDkey][1] == true) {
        checked = "checked";
      }
      if(TDtype == "TD_Inbox"){
        if(TDkey.slice(8, 12) !== mm + dd){
          if (TDitems[TDkey][1] == true){
            TDmvToDone[TDkey]=TDitems[TDkey];
            delete TDitems[TDkey];
            continue
          }
        }else{
          //used &quot; instead of '"' to move.
          MoveTo ='<p class="DelModalItem" onclick="mvToDir(this.parentNode,&quot;TD_Today&quot;)">Move to Today</p>'+
                  '<p class="DelModalItem" onclick="mvToDir(this.parentNode,&quot;TD_Done&quot;)">Move to Done</p>';
        }
      }
      if (TDtype == "TD_Today") {
        MoveTo = '<p class="DelModalItem" onclick="mvToDir(this.parentNode ,&quot;TD_Inbox&quot;)">Move to Inbox</p>'+
                 '<p class="DelModalItem" onclick="mvToDir(this.parentNode,&quot;TD_Done&quot;)">Move to Done</p>';
        //Set items to move if it is not today
        if (TDkey.slice(8, 12) !== mm + dd) {
          if (TDitems[TDkey][1] == true) {
            TDmvToDone[TDkey]=TDitems[TDkey];
          }else{
            TDmvToInbox[TDkey] = TDitems[TDkey];
          }
          delete TDitems[TDkey];
          continue;
        }
      }
      if(TDtype == "TD_Done"){
        MoveTo ='<p class="DelModalItem" onclick="mvToDir(this.parentNode ,&quot;TD_Inbox&quot;)">Move to Inbox</p>'+
                '<p class="DelModalItem" onclick="mvToDir(this.parentNode,&quot;TD_Today&quot;)">Move to Today</p>';
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
        '</label><div class="itemOptModal" ><p class="DelModalItem" onclick="editItem(this.parentNode)">Edit</p>' +
        MoveTo +
        '<p class="DelModalItem" onclick="rmTD(this.parentNode)">Delete Selected</p>' +
        '<p class="DelModalItem" onclick="rmItem(this.parentNode)">Delete</p></div><i class="fa fa-ellipsis-h itemOpt" onclick="itemOptModalToggle(this.previousElementSibling)" style="display:none"></i></div>';
    }
    if (TDtype == "TD_Today") {
      if (Object.keys(TDmvToInbox).length !== 0) {
        if (localStorage.getItem("TD_Inbox") !== null) {
          var LSInbox = JSON.parse(localStorage.getItem("TD_Inbox"));
          Object.assign(TDmvToInbox,LSInbox );
        }
        localStorage.setItem("TD_Inbox", JSON.stringify(TDmvToInbox));
        alert(
          Object.keys(TDmvToInbox).length +
            " items are moved to Inbox."
        );
        store();
      } else {
        delete TDmvToInbox;
      }
    }
    if (Object.keys(TDmvToDone).length !== 0) {
      if (localStorage.getItem("TD_Done") !== null) {
        var LSDone = JSON.parse(localStorage.getItem("TD_Done"));
        Object.assign(TDmvToDone,LSDone);
      }
      localStorage.setItem("TD_Done", JSON.stringify(TDmvToDone));
      alert(
        Object.keys(TDmvToDone).length +
          " items are not made today. Moved them to Done."
      );
      store();
      if(TDtype=="TD_Inbox"&&Object.keys(TDitems).length == 0){
        localStorage.removeItem(TDtype);
        FirstTodo();
      }
    } else {
      delete TDmvToDone;
    }
  }
  list.innerHTML = TDitemHTML;
  setitemOpt();
}
