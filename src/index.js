import "./style.css"

class Project {
    constructor(title) {
        this._title = title;
        this._todoList = [];
        this._id = crypto.randomUUID();            
    }

    get title() {
        return this._title;
    }

    addTask(task) {
        this._todoList.push(task);
    }

    get todoList() {
        return this._todoList;
    }

    set todoList(todoList) {
        this._todoList = todoList;
    }

    get id() {
        return this._id;
    }
}

class Task {
    constructor(title, description, dueDate, priority) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._id = crypto.randomUUID();            
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get dueDate() {
        return this._dueDate;
    }

    get priority() {
        return this._priority;
    }

    get id() {
        return this._id;
    }

    set title(title) {
        this._title = title;
    }

    set description(description) {
        this._description = description;
    }

    set dueDate(dueDate) {
        this._dueDate = dueDate;
    }

    set priority(priority) {
        this._priority = priority;
    }
}

const todo = (() => {
    let projects = [new Project("Today")];
    let currentProject = projects[0];

    const projectToday = document.querySelector(".project-btn");
    projectToday.id = projects[0].id;
    projectToday.addEventListener("click", () => projectEvent(projects[0].id));    

    return {
        getCurrentProject: () => currentProject,
        setCurrentProject: (projectId) => currentProject = projects.find(p => p.id === projectId),
        addProject: (project) => { projects.push(project); return project.id; },
        removeProject: (id) => { projects = projects.filter(p => p.id !== id); },
        addProjectTask: (task) => currentProject.addTask(task), 
        removeTask: (taskId) => currentProject.todoList = currentProject.todoList.filter(t => t.id !== taskId),
        getTask: (taskId) => currentProject.todoList.find(t => t.id === taskId)
    };
})();


const displayTasks = () => {
    const currentProject = todo.getCurrentProject();
    const tasksTabHeader = document.querySelector(".tasks-tab-header");
    tasksTabHeader.textContent = currentProject.title;
    const tasksTab = document.querySelector(".tasks-tab");
    tasksTab.innerHTML = "";
    const todoList = currentProject.todoList;

    for (const task of todoList) {
        const taskItem = document.createElement("div");
        taskItem.className = "task";
        taskItem.id = task.id;
        taskItem.addEventListener("click", () => showTask(task));

        const taskTitle = document.createElement("div");
        taskTitle.className = "task-title";
        taskTitle.textContent = task.title;

        const taskDueDate = document.createElement("div");
        taskDueDate.className = "task-due-date";
        taskDueDate.textContent = task.dueDate;

        const taskBtns = document.createElement("div");
        taskBtns.className = "task-btns";

        const editBtn = document.createElement("button");
        editBtn.className = "edit-btn";
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            editTask(task.id);
        });

        const delTask = (container) => {
            todo.removeTask(task.id)
            container.remove();
        }

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "del-btn";
        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            delTask(delBtn.parentElement.parentElement.parentElement);
        })

        const checkbox = document.createElement("button");
        switch(task.priority) {
            case "Very urgent":
                checkbox.style.border = "1px solid #7F0000";
                checkbox.style.backgroundColor = "#FF4C4C";
                break;
            case "Urgent":
                checkbox.style.border = "1px solid #7F6600";
                checkbox.style.backgroundColor = "#FFD93D";
                break;
            case "Not urgent":
                checkbox.style.border = "1px solid #003312";
                checkbox.style.backgroundColor = "#4CAF50";
                break;
        }
        checkbox.addEventListener("click", (e) => {
            e.stopPropagation();
            delTask(checkbox.parentElement);
        })
        checkbox.className = "checkbox";

        const taskContainer = document.createElement("div");
        taskContainer.className = "task-container";

        taskBtns.append(editBtn, delBtn);
        taskContainer.append(taskTitle, taskDueDate, taskBtns)
        taskItem.append(checkbox, taskContainer);
        tasksTab.append(taskItem);
    }
}

function projectEvent(projectId) {
    todo.setCurrentProject(projectId);
    displayTasks();
}

function editTask(taskId) {
    const task = todo.getTask(taskId);
    const dialog = document.getElementById("create-task");
    const form = dialog.querySelector("form");

    // Pre-fill the form fields
    form.reset();
    dialog.querySelector("#task-title").value = task.title;
    dialog.querySelector("#desc").value = task.description;
    dialog.querySelector("#due-date").value = task.dueDate.toISOString().split("T")[0];
    dialog.querySelector(`input[name="priority"][value="${task.priority}"]`).checked = true;

    // Override submit for this dialog instance only
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        task.title = dialog.querySelector("#task-title").value;
        task.description = dialog.querySelector("#desc").value;
        task.dueDate = new Date(dialog.querySelector("#due-date").value);
        task.priority = dialog.querySelector('input[name="priority"]:checked').value;

        displayTasks();
        dialog.close();
    }, { capture: true, once: true }); // capture ensures it runs first, once removes it after

    dialog.showModal();
}

function showTask(task) {
    const dialog = document.getElementById("show-task");
    const taskInfo = dialog.children;
    taskInfo[1].textContent = `Title: ${task.title}`;
    taskInfo[2].textContent = `Description: ${task.description}`;
    taskInfo[3].textContent = `Due date: ${task.dueDate}`;
    taskInfo[4].textContent = `Priority: ${task.priority}`;
    dialog.showModal();

    document.querySelector(".close-btn").addEventListener("click", () => dialog.close(), { once: true });
}

function setupDialog(openBtnSelector, dialogId, onSubmit) {
    const openBtn = document.querySelector(openBtnSelector);
    const dialog = document.getElementById(dialogId);
    const form = dialog.querySelector("form");

    openBtn.addEventListener("click", () => {
        form.reset();
        dialog.showModal();
    });

    dialog.querySelector(".cancel-btn").addEventListener("click", () => {
        dialog.close();
    });

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        onSubmit(dialog);
        dialog.close();
    });
}


// Project creation dialog
setupDialog(".add-project-btn", "create-project", (dialog) => {
    const title = dialog.querySelector("#project-title").value;
    const idText = todo.addProject(new Project(title));

    const projectsTab = document.querySelector(".projects");
    const project = document.createElement("button");
    project.id = idText;
    project.className = "project-btn";
    project.textContent = title;
    projectsTab.appendChild(project);
    project.addEventListener("click", () => projectEvent(project.id));
});

// Task creation dialog
setupDialog(".task-btn", "create-task", (dialog) => {
    const title = dialog.querySelector("#task-title").value;
    const desc = dialog.querySelector("#desc").value;
    const dueDate = new Date(dialog.querySelector("#due-date").value);
    const priority = dialog.querySelector('input[name="priority"]:checked').value;
    todo.addProjectTask(new Task(title, desc, dueDate, priority));
    displayTasks();
}); 