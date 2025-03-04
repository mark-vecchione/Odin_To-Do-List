import { toDos, projects } from './forms';
import { getAllProjects, getTasksForProject, moveTaskToProject, ensureProjectIds } from './projectManagement';

// Function to populate the project dropdown in the task form
export function populateProjectDropdown() {
    const projectSelect = document.getElementById('projectId');
    
    if (!projectSelect) return;
    
    // Clear existing options
    projectSelect.innerHTML = '';
    
    // Ensure all projects have IDs
    ensureProjectIds();
    
    // Get all projects, including the default project
    const allProjects = getAllProjects();
    
    // Add each project as an option
    allProjects.forEach(project => {
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.title;
        projectSelect.appendChild(option);
    });
}

// Function to render projects table
export function renderProjectsTable() {
    // Get the projects container
    const projectsContainer = document.querySelector('.projects-list');
    
    // Clear the existing content
    projectsContainer.innerHTML = '';
    
    // Ensure all projects have IDs
    ensureProjectIds();
    
    // Get projects with task counts
    const projectsWithCounts = getAllProjects();
    
    // If there are no projects beyond the default, display a message
    if (projectsWithCounts.length <= 1 && projectsWithCounts[0].id === 'default') {
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
    const headers = ['Title', 'Description', 'Priority', 'Tasks', 'Actions'];
    
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
    
    // Add each project as a row (skip the default project)
    projectsWithCounts.filter(project => project.id !== 'default').forEach((project, index) => {
        const row = document.createElement('tr');
        row.dataset.projectId = project.id;
        row.dataset.index = index;
        
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
        
        // Add task count cell
        const taskCountCell = document.createElement('td');
        const taskCount = getTasksForProject(project.id).length;
        taskCountCell.textContent = taskCount;
        row.appendChild(taskCountCell);
        
        // Add action buttons
        const actionsCell = document.createElement('td');
        
        // View tasks button
        const viewTasksBtn = document.createElement('button');
        viewTasksBtn.textContent = 'View Tasks';
        viewTasksBtn.classList.add('view-tasks-btn');
        actionsCell.appendChild(viewTasksBtn);
        
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

// Function to render tasks table for a specific project
// If projectId is null, render all tasks
export function renderTasksTable(projectId = null) {
    // Get the tasks container
    const tasksContainer = document.querySelector('.tasks-list');
    
    // Clear the existing content
    tasksContainer.innerHTML = '';
    
    // Get tasks to display (filtered by project if specified)
    let tasksToDisplay = projectId ? getTasksForProject(projectId) : toDos;
    
    // If there are no tasks, display a message
    if (tasksToDisplay.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks yet. Add your first task!</p>';
        return;
    }
    
    // If showing all tasks, add a project filter dropdown at the top
    if (!projectId) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filter-container';
        
        const filterLabel = document.createElement('label');
        filterLabel.textContent = 'Filter by Project: ';
        filterLabel.htmlFor = 'project-filter';
        
        const filterSelect = document.createElement('select');
        filterSelect.id = 'project-filter';
        
        // Add "All Projects" option
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'All Projects';
        filterSelect.appendChild(allOption);
        
        // Add options for each project
        getAllProjects().forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.title;
            filterSelect.appendChild(option);
        });
        
        // Add change event listener
        filterSelect.addEventListener('change', function() {
            const selectedProjectId = this.value === 'all' ? null : this.value;
            renderTasksTable(selectedProjectId);
        });
        
        filterContainer.appendChild(filterLabel);
        filterContainer.appendChild(filterSelect);
        tasksContainer.appendChild(filterContainer);
    }
    
    // If showing a specific project, add a heading and back button
    if (projectId) {
        const projectHeader = document.createElement('div');
        projectHeader.className = 'project-tasks-header';
        
        // Find the project title
        const project = getAllProjects().find(p => p.id === projectId) || { title: 'Unknown Project' };
        
        const heading = document.createElement('h3');
        heading.textContent = `Tasks for ${project.title}`;
        
        const backButton = document.createElement('button');
        backButton.textContent = 'Back to All Tasks';
        backButton.className = 'back-to-all-tasks';
        backButton.addEventListener('click', () => renderTasksTable());
        
        projectHeader.appendChild(heading);
        projectHeader.appendChild(backButton);
        tasksContainer.appendChild(projectHeader);
    }
    
    // Create table element
    const table = document.createElement('table');
    table.classList.add('tasks-table');
    
    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    // Define headers
    let headers = ['Title', 'Description', 'Due Date', 'Priority'];
    
    // Only add Project column when showing all tasks
    if (!projectId) {
        headers.push('Project');
    }
    
    headers.push('Actions');
    
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
    
    // Get all projects for reference when showing project names
    const allProjects = getAllProjects();
    
    // Add each task as a row
    tasksToDisplay.forEach((task, index) => {
        const row = document.createElement('tr');
        row.dataset.index = toDos.indexOf(task); // Store the real index in the main array
        row.dataset.projectId = task.projectId;
        
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
        
        // Only add Project column when showing all tasks
        if (!projectId) {
            const projectCell = document.createElement('td');
            const taskProject = allProjects.find(p => p.id === task.projectId) || { title: 'Unknown' };
            projectCell.textContent = taskProject.title;
            row.appendChild(projectCell);
        }
        
        // Add action buttons
        const actionsCell = document.createElement('td');
        
        // Add move task button if not filtered by project
        if (!projectId) {
            const moveBtn = document.createElement('button');
            moveBtn.textContent = 'Move';
            moveBtn.classList.add('move-task-btn');
            actionsCell.appendChild(moveBtn);
        }
        
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
    addTaskEventListeners(projectId);
}

// Add event listeners to task table buttons
function addTaskEventListeners(projectId = null) {
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-task-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get the index from the parent row's dataset
            const row = this.closest('tr');
            const index = parseInt(row.dataset.index);
            
            // Delete the task
            toDos.splice(index, 1);
            
            // Re-render the table with the same project filter
            renderTasksTable(projectId);
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
            
            // Make sure project dropdown is populated
            populateProjectDropdown();
            
            // Set the project dropdown to the current project
            if (taskForm.projectId) {
                taskForm.projectId.value = task.projectId;
            }
            
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
    
    // Add event listeners for move task buttons (only when showing all tasks)
    if (!projectId) {
        document.querySelectorAll('.move-task-btn').forEach(button => {
            button.addEventListener('click', function() {
                // Get the task index
                const row = this.closest('tr');
                const taskIndex = parseInt(row.dataset.index);
                
                // Create a modal for selecting the destination project
                const modalContainer = document.createElement('div');
                modalContainer.className = 'move-task-modal-container';
                modalContainer.style.position = 'fixed';
                modalContainer.style.top = '0';
                modalContainer.style.left = '0';
                modalContainer.style.width = '100%';
                modalContainer.style.height = '100%';
                modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                modalContainer.style.display = 'flex';
                modalContainer.style.justifyContent = 'center';
                modalContainer.style.alignItems = 'center';
                modalContainer.style.zIndex = '1000';
                
                const modal = document.createElement('div');
                modal.className = 'move-task-modal';
                modal.style.backgroundColor = 'white';
                modal.style.padding = '20px';
                modal.style.borderRadius = '5px';
                modal.style.width = '300px';
                
                const heading = document.createElement('h3');
                heading.textContent = 'Move Task to Project';
                
                const selectContainer = document.createElement('div');
                selectContainer.style.margin = '20px 0';
                
                const projectSelect = document.createElement('select');
                projectSelect.id = 'move-task-project-select';
                
                // Add options for each project
                getAllProjects().forEach(project => {
                    const option = document.createElement('option');
                    option.value = project.id;
                    option.textContent = project.title;
                    
                    // Select the current project by default
                    if (project.id === row.dataset.projectId) {
                        option.selected = true;
                    }
                    
                    projectSelect.appendChild(option);
                });
                
                selectContainer.appendChild(projectSelect);
                
                const buttonContainer = document.createElement('div');
                buttonContainer.style.display = 'flex';
                buttonContainer.style.justifyContent = 'space-between';
                
                const moveButton = document.createElement('button');
                moveButton.textContent = 'Move';
                moveButton.className = 'confirm-move-btn';
                moveButton.style.backgroundColor = '#4CAF50';
                moveButton.style.color = 'white';
                moveButton.style.border = 'none';
                moveButton.style.padding = '8px 16px';
                moveButton.style.borderRadius = '4px';
                moveButton.style.cursor = 'pointer';
                
                const cancelButton = document.createElement('button');
                cancelButton.textContent = 'Cancel';
                cancelButton.className = 'cancel-move-btn';
                cancelButton.style.backgroundColor = '#f44336';
                cancelButton.style.color = 'white';
                cancelButton.style.border = 'none';
                cancelButton.style.padding = '8px 16px';
                cancelButton.style.borderRadius = '4px';
                cancelButton.style.cursor = 'pointer';
                
                // Add event listeners
                moveButton.addEventListener('click', function() {
                    const selectedProjectId = projectSelect.value;
                    moveTaskToProject(taskIndex, selectedProjectId);
                    document.body.removeChild(modalContainer);
                    renderTasksTable();
                });
                
                cancelButton.addEventListener('click', function() {
                    document.body.removeChild(modalContainer);
                });
                
                buttonContainer.appendChild(moveButton);
                buttonContainer.appendChild(cancelButton);
                
                modal.appendChild(heading);
                modal.appendChild(selectContainer);
                modal.appendChild(buttonContainer);
                
                modalContainer.appendChild(modal);
                document.body.appendChild(modalContainer);
            });
        });
    }
}

// Add event listeners to project table buttons
function addProjectEventListeners() {
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-project-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get the index from the parent row's dataset
            const row = this.closest('tr');
            const index = parseInt(row.dataset.index);
            const projectId = row.dataset.projectId;
            
            // Move tasks to default project
            toDos.forEach(task => {
                if (task.projectId === projectId) {
                    task.projectId = 'default';
                }
            });
            
            // Delete the project
            const projectIndex = projects.findIndex(p => p.id === projectId);
            if (projectIndex !== -1) {
                projects.splice(projectIndex, 1);
            }
            
            // Re-render both tables
            renderProjectsTable();
            renderTasksTable();
        });
    });
    
    // Add event listeners for edit buttons
    document.querySelectorAll('.edit-project-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get the project from the row data
            const row = this.closest('tr');
            const projectId = row.dataset.projectId;
            
            // Find the project in the array
            const projectIndex = projects.findIndex(p => p.id === projectId);
            if (projectIndex === -1) return;
            
            const project = projects[projectIndex];
            
            // Fill the form with the project data
            const projectForm = document.querySelector('#projectForm');
            projectForm.title.value = project.title;
            projectForm.description.value = project.description;
            projectForm.priority.value = project.priority;
            
            // Store the project ID for update
            projectForm.dataset.projectId = projectId;
            
            // Show the form
            document.getElementById('projectFormWrapper').style.display = 'flex';
            
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
                    
                    // Remove project ID
                    delete projectForm.dataset.projectId;
                    
                    // Remove the cancel button
                    this.remove();
                });
                
                submitBtn.parentNode.appendChild(cancelBtn);
            }
        });
    });
    
    // Add event listeners for view tasks buttons
    document.querySelectorAll('.view-tasks-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Get the project ID from the row
            const row = this.closest('tr');
            const projectId = row.dataset.projectId;
            
            // Render tasks for just this project
            renderTasksTable(projectId);
        });
    });
}