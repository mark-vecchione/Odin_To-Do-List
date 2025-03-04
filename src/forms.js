import {toDoItem, createToDoItem, updateToDoItem} from './toDoItem';
import {projectItem, createProjectItem, updateProjectItem} from './projectItem';
import { renderTasksTable, renderProjectsTable } from './tableRenderer';

// global const to grab task and project form wrappers//
const taskFormWrapper = document.getElementById('taskFormWrapper');
const projectFormWrapper = document.getElementById('projectFormWrapper');

// create to do and project arrays//
export const toDos = [];
export const projects = [];

// display task form and project form//
export function showTaskForm() {
  taskFormWrapper.style.display = 'flex';
}

export function showProjectForm() {
    projectFormWrapper.style.display = 'flex';
  }

// hide task form and project form
export function hideTaskForm() {
  taskFormWrapper.style.display = 'none';
}

export function hideProjectForm() {
    projectFormWrapper.style.display = 'none';
}


// add event listener to new task button, display task form//
export function openTaskForm() {
    document.addEventListener('DOMContentLoaded', () => {
        const addTaskButton = document.querySelector('.addTaskButton');
        if(addTaskButton) {
            addTaskButton.addEventListener('click', (event) => {
                //prevent refresh//
                event.preventDefault();
    
                // Reset form to ensure it's in "add" mode
                const taskForm = document.querySelector('#taskForm');
                taskForm.reset();
                
                // Reset any edit-specific UI elements
                const submitBtn = taskForm.querySelector('.submitForm');
                if (submitBtn) {
                    submitBtn.textContent = 'Add Task';
                }
                
                // Remove any edit index
                delete taskForm.dataset.editIndex;
                
                // Remove any cancel button that might exist
                const cancelBtn = taskForm.querySelector('.cancelEdit');
                if (cancelBtn) {
                    cancelBtn.remove();
                }
                
                // display task form//
                showTaskForm();
            });
        }
    });
}

// add event listener to new project button, display project form//
export function openProjectForm() {
    document.addEventListener('DOMContentLoaded', () => {
        const addProjectButton = document.querySelector('.addProjectButton');
        if(addProjectButton) {
            addProjectButton.addEventListener('click', (event) => {
                //prevent refresh//
                event.preventDefault();
                
                // Reset form to ensure it's in "add" mode
                const projectForm = document.querySelector('#projectForm');
                projectForm.reset();
                
                // Reset any edit-specific UI elements
                const submitBtn = projectForm.querySelector('.submitForm');
                if (submitBtn) {
                    submitBtn.textContent = 'Add Project';
                }
                
                // Remove any edit index
                delete projectForm.dataset.editIndex;
                
                // Remove any cancel button that might exist
                const cancelBtn = projectForm.querySelector('.cancelEdit');
                if (cancelBtn) {
                    cancelBtn.remove();
                }

                // display project form//
                showProjectForm();
            });
        }
    });
}

// task form submission //
export function submitTaskForm() {
    document.addEventListener('DOMContentLoaded', () => {
        const taskForm = document.querySelector('#taskForm');
        
        if (taskForm) {
            taskForm.addEventListener('submit', (event) => {
                //prevent refresh//
                event.preventDefault();
                
                // Get form data
                const formData = Object.fromEntries(new FormData(taskForm));
                
                // Check if we're editing or creating
                if (taskForm.dataset.editIndex !== undefined) {
                    // We're editing an existing task
                    const index = parseInt(taskForm.dataset.editIndex);
                    
                    // Update the task
                    updateToDoItem(toDos[index], formData);
                    
                    // Remove the edit index
                    delete taskForm.dataset.editIndex;
                    
                    // Reset button text
                    const submitBtn = taskForm.querySelector('.submitForm');
                    if (submitBtn) {
                        submitBtn.textContent = 'Add Task';
                    }
                    
                    // Remove any cancel button
                    const cancelBtn = taskForm.querySelector('.cancelEdit');
                    if (cancelBtn) {
                        cancelBtn.remove();
                    }
                } else {
                    // We're creating a new task
                    toDos.push(createToDoItem(formData));
                }
                
                // Reset and hide the form
                taskForm.reset();
                hideTaskForm();
                
                // Render the updated tasks table
                renderTasksTable();
            });
        }
    });
}

//project form submission//
export function submitProjectForm() {
    document.addEventListener('DOMContentLoaded', () => {
        const projectForm = document.querySelector('#projectForm');
        
        if (projectForm) {
            projectForm.addEventListener('submit', (event) => {
                //prevent refresh//
                event.preventDefault();
                
                // Get form data
                const formData = Object.fromEntries(new FormData(projectForm));
                
                // Check if we're editing or creating
                if (projectForm.dataset.editIndex !== undefined) {
                    // We're editing an existing project
                    const index = parseInt(projectForm.dataset.editIndex);
                    
                    // Update the project
                    updateProjectItem(projects[index], formData);
                    
                    // Remove the edit index
                    delete projectForm.dataset.editIndex;
                    
                    // Reset button text
                    const submitBtn = projectForm.querySelector('.submitForm');
                    if (submitBtn) {
                        submitBtn.textContent = 'Add Project';
                    }
                    
                    // Remove any cancel button
                    const cancelBtn = projectForm.querySelector('.cancelEdit');
                    if (cancelBtn) {
                        cancelBtn.remove();
                    }
                } else {
                    // We're creating a new project
                    projects.push(createProjectItem(formData));
                }
                
                // Reset and hide the form
                projectForm.reset();
                hideProjectForm();
                
                // Render the updated projects table
                renderProjectsTable();
            });
        }
    });
}