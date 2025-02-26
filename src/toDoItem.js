export class toDoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
    }
}

export function createToDoItem({title, description,dueDate, priority}) {
    return new toDoItem(title, description, dueDate, priority);
}

export function updateToDoItem(item, updates) {
    if (updates.title !== undefined) item.title = updates.title;
    if (updates.description !== undefined) item.description = updates.description;
    if (updates.dueDate !== undefined) item.dueDate = updates.dueDate;
    if (updates.priority !== undefined) item.priority = updates.priority;
    return item;
  }
  

