document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskDescription = document.getElementById("taskDescription").value.trim();
    let dueDate = document.getElementById("dueDate").value;
    let alarmTime = document.getElementById("alarmTime").value;
    let priority = document.getElementById("priority").value;
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.innerHTML = `
        <span>
            <strong>${taskText}</strong> <br> 
            <small>${taskDescription}</small> <br>
            Due: ${dueDate} | Alarm: ${alarmTime} | <span class="priority-${priority}">${priority}</span>
        </span>
        <div>
            <button class="complete-btn" onclick="toggleComplete(this)">✔️</button>
            <button class="edit-btn" onclick="editTask(this)">✏️</button>
            <button class="delete-btn" onclick="deleteTask(this)">❌</button>
        </div>
    `;

    taskList.appendChild(li);
    saveTasks();
    setAlarm(taskText, dueDate, alarmTime);
    
    taskInput.value = "";
    document.getElementById("taskDescription").value = "";
}

function editTask(button) {
    let taskSpan = button.parentElement.parentElement.querySelector("span strong");
    let newText = prompt("Edit task:", taskSpan.textContent);
    
    if (newText !== null) {
        taskSpan.textContent = newText.trim();
        saveTasks();
    }
}

function deleteTask(button) {
    let taskList = document.getElementById("taskList");
    let taskItem = button.parentElement.parentElement;
    taskList.removeChild(taskItem);
    saveTasks();
}

function toggleComplete(button) {
    let taskItem = button.parentElement.parentElement;
    taskItem.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        let taskText = task.querySelector("span strong").textContent;
        let taskDescription = task.querySelector("span small").textContent;
        let dueDate = task.querySelector("span").childNodes[4].textContent.replace(" Due: ", "").trim();
        let priority = task.querySelector("span span").textContent;
        let completed = task.classList.contains("completed");
        tasks.push({ taskText, taskDescription, dueDate, priority, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        let li = document.createElement("li");
        li.classList.toggle("completed", task.completed);
        li.innerHTML = `
            <span>
                <strong>${task.taskText}</strong> <br> 
                <small>${task.taskDescription}</small> <br>
                Due: ${task.dueDate} | <span class="priority-${task.priority}">${task.priority}</span>
            </span>
            <div>
                <button class="complete-btn" onclick="toggleComplete(this)">✔️</button>
                <button class="edit-btn" onclick="editTask(this)">✏️</button>
                <button class="delete-btn" onclick="deleteTask(this)">❌</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function setAlarm(taskText, dueDate, alarmTime) {
    let alarmDateTime = new Date(`${dueDate}T${alarmTime}`);
    let now = new Date();
    let timeDiff = alarmDateTime - now;

    if (timeDiff > 0) {
        setTimeout(() => {
            document.getElementById("alarmSound").play();
            alert(`⏰ Reminder: ${taskText} is due now!`);
        }, timeDiff);
    }
}
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
      .then(() => console.log("Service Worker Registered"))
      .catch((error) => console.log("Service Worker Registration Failed:", error));
  }
  