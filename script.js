const newTaskInput = document.getElementById("taskInput"); // user Input

const addButton = document.getElementById("addTask"); // add button

const removeTask = document.getElementById("removeButton"); // trashcan button

const taskList = document.querySelector(".addedList"); // querySelector takes values from CSS file.

loadTask();

taskList.addEventListener("click", function(checker) {
    if (checker.target.tagName === "LI") { // targets the tag li, has to be capital letter.
        checker.target.classList.toggle("checked"); // This adds checked class to the task.
        saveTask();
    }
}, false);

function addTask() {
    const task = newTaskInput.value.trim(); // This line retrieves user input, but also trim the useless spaces

    if (task) { // If there is input value
        createNewTask(task); 

        saveTask(task)


        newTaskInput.value = ""; // clear text input

    } else {
        alert("Please enter something!"); // If nothing is entered, alert message display.
    }

}


addButton.addEventListener("click", addTask); // on click, perform this function.


function createNewTask (task) { // Creates a task and put into list tag via user input.
    var listedItem = document.createElement("li");

    listedItem.textContent = task;  // This reads and takes value from taskInput

    taskList.appendChild(listedItem); // When task created, append to li tags.


    removeTask.addEventListener("click", function() { // Spawn remove button at the tasks
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "\u00D7"; // Use "x" symbol for delete icon. This is a js unicode

        deleteButton.className = "deleteTask"; // The created button element gets a class called "deleteTask"
    
        listedItem.appendChild(deleteButton); // Append the delete button to the tasks (li)

        deleteButton.addEventListener("click", function(){ // Remove list button
            taskList.removeChild(listedItem);
            saveTask(); // Saves the deleted Array, so when refreshed, the deleted list is gone

        })
    
    }) 

}


function saveTask () {
    let tasks = [];

    taskList.querySelectorAll("li").forEach(function(item) {
        tasks.push(item.textContent.replace("\u00D7","").trim()); // This replaces the extra symbol added to the list text with nothing, essentially clears it.
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Set database in Json or [] empty array if null value

    tasks.forEach(createNewTask);
}

