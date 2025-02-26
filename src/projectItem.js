export class projectItem {
    constructor(title, description, priority) {
        this.title = title
        this.description = description
        this.priority = priority
    }
}

export function createProjectItem({title, description, priority}) {
    return new projectItem(title, description, priority);
}

export function updateProjectItem(item, updates) {
    if (updates.title !== undefined) item.title = updates.title;
    if (updates.description !== undefined) item.description = updates.description;
    if (updates.priority !== undefined) item.priority = updates.priority;
    return item;
  }
  
