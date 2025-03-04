// First, let's modify the toDoItem class to include a project reference

// In src/toDoItem.js, update the toDoItem class:
export class toDoItem {
    constructor(title, description, dueDate, priority, projectId = 'default') {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectId = projectId; // Default to 'default' if no project specified
    }
}

export function createToDoItem({title, description, dueDate, priority, projectId = 'default'}) {
    return new toDoItem(title, description, dueDate, priority, projectId);
}

export function updateToDoItem(item, updates) {
    if (updates.title !== undefined) item.title = updates.title;
    if (updates.description !== undefined) item.description = updates.description;
    if (updates.dueDate !== undefined) item.dueDate = updates.dueDate;
    if (updates.priority !== undefined) item.priority = updates.priority;
    if (updates.projectId !== undefined) item.projectId = updates.projectId;
    return item;
}

