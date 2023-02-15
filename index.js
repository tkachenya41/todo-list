const form = document.querySelector(".header");
const tasksList = document.querySelector(".tasksList");
const taskInput = document.querySelector("#taskInput");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => renderTask(task));
}

form.addEventListener("click", addTask);

form.addEventListener("click", deleteAllTasks);

tasksList.addEventListener("click", deleteTask);

tasksList.addEventListener("click", completeTask);

form.addEventListener("keydown", addTaskByEnter);

function addTask(event) {
  event.preventDefault();
  if (event.target.dataset.action === "add") {
    const taskText = taskInput.value;

    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
      date: new Date().toLocaleDateString(),
    };

    tasks.push(newTask);

    saveToLocalStorage();

    renderTask(newTask);

    taskInput.value = "";
    taskInput.focus();
  }
}

function addTaskByEnter(event) {
  if (event.key === "Enter" && event.target.dataset.action === "addByEnter") {
    event.preventDefault();
    const taskText = taskInput.value;

    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
      date: new Date().toLocaleDateString(),
    };

    tasks.push(newTask);

    saveToLocalStorage();

    renderTask(newTask);

    taskInput.value = "";
    taskInput.focus();
  }
}

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest("li");

    const id = Number(parentNode.id);

    tasks = tasks.filter((task) => task.id !== id);

    saveToLocalStorage();

    parentNode.remove();
  }
}

function completeTask(event) {
  if (event.target.dataset.action === "complete") {
    const parentNode = event.target.closest("li");

    const id = Number(parentNode.id);

    const task = tasks.find((task) => task.id === id);

    task.done = !task.done;

    saveToLocalStorage();

    const taskText = parentNode.querySelector(".taskText");
    taskText.classList.toggle("complete");
  }
}

function deleteAllTasks(event) {
  if (event.target.dataset.action === "delete-all") {
    tasks = [];

    saveToLocalStorage();

    do {
      tasksList.firstChild.remove();
    } while (tasksList.firstChild);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? "taskText complete" : "taskText";

  taskHTML = `<li id="${task.id}"class="task">
  <div class="left_task">
    <button class="completeTask" data-action = "complete">
      <img src="tick.png" alt="tick" />
    </button>
    <input type="text" class="${cssClass}" value="${task.text}" /> </div>
  </div>
  <div class="right_task">
    <button class="deleteTask" data-action="delete">
      <img src="cross.png" alt="cross" />
    </button>
    <button class="editTask" data-action="edit">Edit</button>
    <input type="text" value="${task.date}" />
  </div>
</li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}
