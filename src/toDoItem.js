export class toDoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }
}

export const toDoOne = new toDoItem("test note", "this is a test note", "9/7/24","low");

