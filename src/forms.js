import {toDoItem, createToDoItem, updateToDoItem} from './toDoItem';
import {projectItem, createProjectItem, updateProjectItem} from './projectItem';

// global const to grab task and project form wrappers//
const taskFormWrapper = document.getElementById('taskFormWrapper');
const projectFormWrapper = document.getElementById('projectFormWrapper');

// create to do and project arrays//
const toDos = [];
const projects = [];

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
    
                // display task form//
                showTaskForm();
            })
        }
    })
};


// add event listener to new project button, display project form//
export function openProjectForm() {
    document.addEventListener('DOMContentLoaded', () => {
        const addProjectButton = document.querySelector('.addProjectButton');
        if(addProjectButton) {
            addProjectButton.addEventListener('click', (event) => {
                //prevent refresh//
                event.preventDefault();

                // display task form//
                showProjectForm();
            })
        }
    })
}

//attach event listener to task and project form//
const taskForm = document.querySelector('#taskForm');
const projectForm = document.querySelector('#projectForm');

// task form submission //

export function submitTaskForm() {
    taskForm.addEventListener('submit', (event) => {
        //prevent refresh//
        event.preventDefault();

        //create to do item//
        toDos.push(createToDoItem(Object.fromEntries(new FormData(taskForm))));

        //hide form//
        hideTaskForm();

        //log to test//
        renderToDos();
    });
}

//project form submission//

export function submitProjectForm() {
    projectForm.addEventListener('submit', (event) => {
        //prevent refresh//
        event.preventDefault();

        projects.push(createProjectItem(Object.fromEntries(new FormData(projectForm))));

        //hide form//
        hideProjectForm();

        //log data to test//
        renderProjects();
    });
}


//render To Dos//
export function renderToDos() {
    const tasksList = document.querySelector(".tasks-list");
  
    // Clear out existing HTML
    tasksList.innerHTML = '';
  
    // Iterate over the toDos array
    toDos.forEach((item, index) => {
      const toDoElement = document.createElement('li');
      toDoElement.classList.add('to-do-item');
  
      toDoElement.innerHTML = `
        <div class= 'deleteButtonWrapper'>
            <button class='deleteButton' data-type='task' data-index="${index}">
            Delete Task
            </button>
        </div>
        <div class = 'toDoArray'>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p>Due: ${item.dueDate}</p>
            <p>Priority: ${item.priority}</p>
        </div>
      `;
  
      // Append new element to list container
      tasksList.appendChild(toDoElement);
    });
  };
  
//render Projects//
export function renderProjects() {
    const projectsList = document.querySelector('.projects-list');
  
    // Clear out existing HTML
    projectsList.innerHTML = '';
  
    // Iterate over the toDos array
    projects.forEach((item, index) => {
      const projectElement = document.createElement('li');
      projectElement.classList.add('project-item');
  
      projectElement.innerHTML = `
        <div class = 'deleteButtonWrapper'>
            <button class='deleteButton' data-type='project' data-index = "${index}">
            Delete
            </button>
        </div>
        <div class = 'projectArray'>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p>Priority: ${item.priority}</p>
        </div<
      `;
  
      // Append new element to list container
      projectsList.appendChild(projectElement);
    });
  }

  // attach event listeners to delete buttons//
export function deleteButtons() {
    document.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index');
        const type = event.target.getAttribute('data-type');

        if (type === 'task') {
            toDos.splice(index,1);
            renderToDos();
        } else if (type === 'project') {
            projects.splice(index,1);
            renderProjects();
        }
    });
};
  