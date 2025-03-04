// src/tableRenderer.js
import { toDos, projects } from './forms';

// Function to render tasks table
export function renderTasksTable() {
    // Get the tasks container
    const tasksContainer = document.querySelector('.tasks-list');
    
    // Clear the existing content
    tasksContainer.innerHTML = '';
    
    // If there are no tasks, display a message
    if (toDos.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks yet. Add your first task!</p>';
        return;
    }
    
    // Create table element
    const table = document.createElement('table');
    table.classList.add('tasks-table');
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Define headers
    const headers = ['Title', 'Description', 'Due Date', 'Priority', 'Actions'];
    
    // Add headers to the row
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Add each task as a row
    toDos.forEach((task, index) => {
        const row = document.createElement('tr');
        row.dataset.index = index; // Store the index in the row's dataset
        
        // Add task data cells
        const titleCell = document.createElement('td');
        titleCell.textContent = task.title;
        row.appendChild(titleCell);
        
        const descCell = document.createElement('td');
        descCell.textContent = task.description;
        row.appendChild(descCell);
        
        const dateCell = document.createElement('td');
        dateCell.textContent = task.dueDate;
        row.appendChild(dateCell);
        
        const priorityCell = document.createElement('td');
        priorityCell.textContent = task.priority;
        // Add color-coding based on priority
        priorityCell.classList.add(`priority-${task.priority.toLowerCase()}`);
        row.appendChild(priorityCell);
        
        // Add action buttons
        const actionsCell = document.createElement('td');
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-task-btn');
        actionsCell.appendChild(deleteBtn);
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-task-btn');
        actionsCell.appendChild(editBtn);
        
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    tasksContainer.appendChild(table);
    
    // Add event listeners AFTER the table is in the DOM
    // This ensures we don't have stale references
    addTaskEventListeners();
}

// Add event listeners to task table buttons
function addTaskEventListeners() {
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-task-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get the index from the parent row's dataset
            const row = this.closest('tr');
            const index = parseInt(row.dataset.index);
            
            // Delete the task
            toDos.splice(index, 1);
            
            // Re-render the table
            renderTasksTable();
        });
    });
    
    // Add event listeners for edit buttons
    document.querySelectorAll('.edit-task-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get the index from the parent row's dataset
            const row = this.closest('tr');
            const index = parseInt(row.dataset.index);
            const task = toDos[index];
            
            // Fill the form with the task data
            const taskForm = document.querySelector('#taskForm');
            taskForm.title.value = task.title;
            taskForm.description.value = task.description;
            taskForm.dueDate.value = task.dueDate;
            taskForm.priority.value = task.priority;
            
            // Show the form
            document.getElementById('taskFormWrapper').style.display = 'flex';
            
            // Store the task index in a data attribute on the form
            taskForm.dataset.editIndex = index;
            
            // Change the form submission button text
            const submitBtn = taskForm.querySelector('.submitForm');
            submitBtn.textContent = 'Update Task';
            
            // Add a cancel button if it doesn't exist
            if (!taskForm.querySelector('.cancelEdit')) {
                const cancelBtn = document.createElement('button');
                cancelBtn.textContent = 'Cancel';
                cancelBtn.classList.add('cancelEdit');
                cancelBtn.type = 'button'; // So it doesn't submit the form
                
                cancelBtn.addEventListener('click', function() {
                    // Reset and hide the form
                    taskForm.reset();
                    document.getElementById('taskFormWrapper').style.display = 'none';
                    
                    // Reset the form to "Add" mode
                    submitBtn.textContent = 'Add Task';
                    
                    // Remove edit index
                    delete taskForm.dataset.editIndex;
                    
                    // Remove the cancel button
                    this.remove();
                });
                
                submitBtn.parentNode.appendChild(cancelBtn);
            }
        });
    });
}

// Function to render projects table
export function renderProjectsTable() {
    // Get the projects container
    const projectsContainer = document.querySelector('.projects-list');
    
    // Clear the existing content
    projectsContainer.innerHTML = '';
    
    // If there are no projects, display a message
    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects yet. Add your first project!</p>';
        return;
    }
    
    // Create table element
    const table = document.createElement('table');
    table.classList.add('projects-table');
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Define headers
    const headers = ['Title', 'Description', 'Priority', 'Actions'];
    
    // Add headers to the row
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body
    const tbody = document.createElement('tbody');
    
    // Add each project as a row
    projects.forEach((project, index) => {
        const row = document.createElement('tr');
        row.dataset.index = index; // Store the index in the row's dataset
        
        // Add project data cells
        const titleCell = document.createElement('td');
        titleCell.textContent = project.title;
        row.appendChild(titleCell);
        
        const descCell = document.createElement('td');
        descCell.textContent = project.description;
        row.appendChild(descCell);
        
        const priorityCell = document.createElement('td');
        priorityCell.textContent = project.priority;
        // Add color-coding based on priority
        priorityCell.classList.add(`priority-${project.priority.toLowerCase()}`);
        row.appendChild(priorityCell);
        
        // Add action buttons
        const actionsCell = document.createElement('td');
        
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-project-btn');
        actionsCell.appendChild(deleteBtn);
        
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-project-btn');
        actionsCell.appendChild(editBtn);
        
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    projectsContainer.appendChild(table);
    
    // Add event listeners AFTER the table is in the DOM
    addProjectEventListeners();
}

// Add event listeners to project table buttons
function addProjectEventListeners() {
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-project-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get the index from the parent row's dataset
            const row = this.closest('tr');
            const index = parseInt(row.dataset.index);
            
            // Delete the project
            projects.splice(index, 1);
            
            // Re-render the table
            renderProjectsTable();
        });
    });
    
    // Add event listeners for edit buttons
    document.querySelectorAll('.edit-project-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get the index from the parent row's dataset
            const row = this.closest('tr');
            const index = parseInt(row.dataset.index);
            const project = projects[index];
            
            // Fill the form with the project data
            const projectForm = document.querySelector('#projectForm');
            projectForm.title.value = project.title;
            projectForm.description.value = project.description;
            projectForm.priority.value = project.priority;
            
            // Show the form
            document.getElementById('projectFormWrapper').style.display = 'flex';
            
            // Store the project index in a data attribute on the form
            projectForm.dataset.editIndex = index;
            
            // Change the form submission button text
            const submitBtn = projectForm.querySelector('.submitForm');
            submitBtn.textContent = 'Update Project';
            
            // Add a cancel button if it doesn't exist
            if (!projectForm.querySelector('.cancelEdit')) {
                const cancelBtn = document.createElement('button');
                cancelBtn.textContent = 'Cancel';
                cancelBtn.classList.add('cancelEdit');
                cancelBtn.type = 'button'; // So it doesn't submit the form
                
                cancelBtn.addEventListener('click', function() {
                    // Reset and hide the form
                    projectForm.reset();
                    document.getElementById('projectFormWrapper').style.display = 'none';
                    
                    // Reset the form to "Add" mode
                    submitBtn.textContent = 'Add Project';
                    
                    // Remove edit index
                    delete projectForm.dataset.editIndex;
                    
                    // Remove the cancel button
                    this.remove();
                });
                
                submitBtn.parentNode.appendChild(cancelBtn);
            }
        });
    });
}