const openModalBtn = document.querySelector(".add-task-btn");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");
const addTaskForm = document.getElementById("add-task-form");

const myBtn = document.querySelector("#add-task-btn");
const searchBtn = document.getElementById("search-btn");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});



searchBtn.addEventListener("click", (event) => {
  // standard code to prevent your page from reloading
  event.preventDefault();

  const searchDate = document.getElementById("search-date").value;
  const searchPriority = document.getElementById("search-priority").value;
  const searchStatus = document.getElementById("search-status").value;

  searchTasks(searchDate, searchPriority, searchStatus);
});

function searchTasks(searchDate, searchPriority, searchStatus) {
  const tasks = Array.from(document.querySelectorAll("li"));

  tasks.forEach((task) => {
    const taskDueDate = task.querySelector("p:nth-of-type(3)").textContent;
    const taskPriority = task.querySelector("p:nth-of-type(2)").textContent;
    const taskStatus = task.querySelector("p:nth-of-type(4)").textContent;

    if (
      (searchDate && taskDueDate !== searchDate) ||
      (searchPriority && taskPriority !== searchPriority) ||
      (searchStatus && taskStatus !== searchStatus)
    ) {
      task.visible = "false";
      task.style.display = "none";
    } else {
      task.visible = "true"
      task.style.display = "block";
    }
  });
}



myBtn.addEventListener("click", (event) => {
  // standard code to prevent your page from reloading
  event.preventDefault();

  const taskName = document.getElementById("task-name").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("due-date").value;
  const status = document.getElementById("status").value;

  addTask(taskName, priority, dueDate, status);
  modal.style.display = "none";
});


function addTask(taskName, priority, dueDate, status) {
  let tasks = [taskName, priority, dueDate, status];
  let li = document.createElement('li');
  tasks.forEach(function (curr) {
    let p = document.createElement('p');
    p.textContent = curr;
    li.appendChild(p);
    // if(priority=='low'){
    //   p.style.backgroundColor= 'rgb(200, 10, 10)';
    //   li.appendChild(p);
    // } 
  });

  // Create an "Edit" button for the list item
  let editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.style.cssText = 'width: 50%; padding: 5px;  background-color: #2452ad; color:white;  border: none; margin: auto;  box-shadow: 2px 2px 4px rgb(0, 0, 0); border-radius: 10px; margin-bottom: 10px; cursor:pointer '

  editBtn.addEventListener('click', function () {
    editTask(li, tasks, editBtn, deleteBtn);
  });
  li.appendChild(editBtn);

  // Create a "Delete" button for the list item
  let deleteBtn = document.createElement('button');
  deleteBtn.style.cssText = 'width: 50%; padding: 5px; background-color: #2452ad; color:white;  border: none; margin: auto;  box-shadow: 2px 2px 4px rgb(0, 0, 0); border-radius: 10px;  margin-bottom: 10px; cursor:pointer'

  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', function () {
    deleteTask(li, tasks);
  });
  li.appendChild(deleteBtn);

  // Add the list item to the appropriate column
  if (status == "not-started") {
    let list = document.getElementById("not-started");
    list.appendChild(li);
  } else if (status == "in-progress") {
    let list = document.getElementById("in-progress");
    list.appendChild(li);
  } else if (status == "completed") {
    let list = document.getElementById("completed");
    list.appendChild(li);
  }
}

function editTask(li, tasks, editBtn, deleteBtn) {
  let inputFields = [];
  tasks.forEach(function (curr) {
    let input = document.createElement('input');
    input.style.width = "90%";
    input.value = curr;
    inputFields.push(input);
  });

  // Replace task items with input fields
  li.innerHTML = '';
  inputFields.forEach(function (input) {
    let p = document.createElement('p');
    p.appendChild(input);
    li.appendChild(p);
  });

  // Create a "Save" button
  let saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  saveBtn.style.cssText = 'width: 50%; padding: 5px; background-color: #2452ad; color:white; border: none; margin: auto;  box-shadow: 2px 2px 4px rgb(0, 0, 0); border-radius: 10px;  margin-bottom: 10px; cursor:pointer'
  saveBtn.addEventListener('click', function () {
    // Replace input fields with updated task items
    tasks = inputFields.map(function (input) {
      return input.value;
    });

    // Update list item with updated task items
    li.innerHTML = '';
    tasks.forEach(function (curr) {
      let p = document.createElement('p');
      p.textContent = curr;
      li.appendChild(p);
    });
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    li.removeChild(saveBtn);
  });
  li.appendChild(saveBtn);

  // Remove edit and delete buttons
  li.removeChild(editBtn);
  li.removeChild(deleteBtn);
}

function deleteTask(li, tasks) {
  // Find the index of the current task in the array
  let index = tasks.indexOf(li.firstChild.textContent);

  // Remove the task from the array
  if (index > -1) {
    tasks.splice(index, 1);
  }

  // Remove the list item from the DOM
  li.remove();
}


const refreshBtn = document.querySelector("#refresh-btn");

refreshBtn.addEventListener("click", () => {
  // Reload the page to refresh the task list
  alert("Are you confirmed ?")
  // clear the search input values
  document.getElementById("search-date").value = "";
  document.getElementById("search-priority").value = "";
  document.getElementById("search-status").value = "";

  // display all tasks
  const taskList = document.querySelectorAll(".task-list li");
  taskList.forEach((task) => {
    task.style.display = "block";
  });

});
