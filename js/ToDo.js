var list = document.querySelector("#TDlist"),
  form = document.querySelector("#ToDoForm"),
  item = document.querySelector("#TDitem"),
  click = document.querySelector("#TDClick"),
  TDBox = document.querySelector("#ToDo-box");

form.addEventListener(
  "submit",
  function(e) {
    e.stopPropagation();
    e.preventDefault();
    list.innerHTML += "<li class='TDitems'>" + item.value + "</li>";
    store();
    item.value = "";
  },
  false
);

list.addEventListener(
  "click",
  function(e) {
    var t = e.target;
    t.classList.contains("TDchecked")
      ? t.parentNode.removeChild(t)
      : t.classList.add("TDchecked");
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
  window.localStorage.TDitems = list.innerHTML;
}

function getValues() {
  var storedValues = window.localStorage.TDitems;
  !storedValues
    ? (list.innerHTML = "<li>Make a to do list</li>")
    : (list.innerHTML = storedValues);
}
getValues();
