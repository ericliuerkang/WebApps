var addButton = document.getElementById("add-button");
var clearButton = document.getElementById("clear-completed-button");
var saveButton = document.getElementById("save-button");
var emptyButton = document.getElementById("empty-button");

var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");


addButton.addEventListener("click", addToDoItem);
function addToDoItem() {
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);

    var toDoArray = [];
    if (localStorage.getItem("toDoArray") != null) {
      toDoArray = JSON.parse(localStorage.getItem("toDoArray"));
    }

    var toDoInfo = {
      "task": itemText, 
      "completed": false
    };

    toDoArray.push(toDoInfo);
    localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
}

clearButton.addEventListener("click", clearCompletedToDoItems);
function clearCompletedToDoItems() {
  var toDoItems = toDoList.getElementsByClassName("completed")
  while (toDoItems.length > 0) {
    toDoItems.item(0).remove();
  }
}

emptyButton.addEventListener("click", emptyList);
function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
    localStorage.removeItem("toDoArray");
}

saveButton.addEventListener("click", saveList);
function saveList() {
  var toDoArray = [];

  for (var i=0; i<toDoList.children.length; i++) {
    var curItem = toDoList.children.item(i);

    var toDoInfo = {
      "task": curItem.innerText,
      "completed": curItem.classList.contains("completed")
    };

    toDoArray.push(toDoInfo);
  }

  localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
}

function loadList() {
  if (localStorage.getItem("toDoArray") != null) {
    var toDoArray = JSON.parse(localStorage.getItem("toDoArray"));

    for (var i = 0; i < toDoArray.length; i++) {
      var curItem = toDoArray[i];
      newToDoItem(curItem.task, curItem.completed);
    }
  }
}
loadList();

function newToDoItem(itemText, completed) {
  var toDoItem = document.createElement("li");
  var toDoText = document.createTextNode(itemText);
  toDoItem.appendChild(toDoText);
  if (completed) {
      toDoItem.classList.add("completed");
  }
  toDoList.appendChild(toDoItem);
  toDoItem.addEventListener("dblclick", toggleToDoItemState);
}

function toggleToDoItemState() {
  var isComplete = true;
  if (this.classList.contains("completed")) {
      this.classList.remove("completed");
      isComplete = false;
  } else {
      this.classList.add("completed");
  }

  var text = this.innerText;
  console.log(text);
  var toDoArray = JSON.parse(localStorage.getItem("toDoArray"));
  for (var i=0; i<toDoArray.length; i++) {
    console.log(toDoArray[i]);
    if (toDoArray[i].task == text && toDoArray[i].completed == false) {
      console.log('entered');
      toDoArray[i].completed = isComplete;
      break;
    }
  }
  localStorage.setItem("toDoArray", JSON.stringify(toDoArray));
}
