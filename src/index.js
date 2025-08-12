import "./style.css"

const todo = (() => {
    let projectsList = [];
    let currentProject = projectsList[0];

    return {
        addProject(project) {
            projectsList.push(project);
        },
        removeProject(projectId) {
            projectsList = projectsList.filter(project => project.id !== projectId);
        },
        addProjectTask(task) {
            currentProject.addTask(task);
        }
    }
})();

class Project {
    constructor(title) {
        this._title = title;
        this._todoList = [];
        this._id = crypto.randomUUID()            
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    addTask(task) {
        this._todoList.push(task);
    }

    get todoList() {
        return this._todoList;
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
        this._id = crypto.randomUUID()            
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

function setupDialog(openBtnSelector, dialogId, onSubmit) {
    document.querySelector(openBtnSelector).addEventListener("click", () => {
        const dialog = document.getElementById(dialogId);
        dialog.showModal();

        dialog.querySelector(".cancel-btn").addEventListener("click", () => {
            dialog.close();
        }, { once: true });

        const form = dialog.querySelector("form");
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            onSubmit(dialog);
            dialog.close();
        }, { once: true });
    });
}

// Project dialog
setupDialog(".project-btn", "create-project", (dialog) => {
    const title = dialog.querySelector("#project-title").value;
    todo.addProject(new Project(title));
});

// Task dialog
setupDialog(".task-btn", "create-task", (dialog) => {
    const title = dialog.querySelector("#task-title").value;
    const desc = dialog.querySelector("#desc").value;
    const dueDate = new Date(dialog.querySelector("#due-date").value);
    const priority = dialog.querySelector('input[name="priority"]:checked').value;
    todo.addProjectTask(new Task(title, desc, dueDate, priority));
});

