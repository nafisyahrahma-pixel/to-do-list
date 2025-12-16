const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const progress = document.getElementById("progress");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ text, done: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.done) li.classList.add("done");

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.done ? "checked" : ""} 
                onclick="toggleTask(${index})">
                <span>${task.text}</span>
            </div>
            <button class="delete" onclick="deleteTask(${index})">✕</button>
        `;

        taskList.appendChild(li);
    });

    updateProgress();
}

function updateProgress() {
    const done = tasks.filter(t => t.done).length;
    progress.innerText = `Tugas selesai: ${done} dari ${tasks.length}`;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
