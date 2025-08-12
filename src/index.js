import "./style.css"

const projectsList = [];

class Project {
    constructor(title) {
        this._title = title;
        this._todoList = [];
    }

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
    }

    addTodo(todo) {
        this._todoList.push(todo);
    }

    get todoList() {
        return this._todoList;
    }
}

class TodoItem {
    constructor(title, description, dueDate, priority) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
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
    projectsList.push(new Project(title));
});

// Task dialog
setupDialog(".task-btn", "create-task", (dialog) => {
    const title = dialog.querySelector("#task-title").value;
    const desc = dialog.querySelector("#desc").value;
    const dueDate = dialog.querySelector("#due-date").value;
    const priority = dialog.querySelector("#priority").value;
});

