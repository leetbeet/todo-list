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

document.querySelector(".project-btn").addEventListener("click", () => {
    const dialog = document.getElementById("create-project");
    dialog.showModal();

    document.getElementById("cancel-btn").addEventListener("click", () => {
        dialog.close();
    });

    const form = document.getElementById("create-project-form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const title = document.getElementById("project-title").value;
        projectsList.push(new Project(title));
        
        dialog.close();
    })
});

