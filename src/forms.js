// global const to grab task and project form wrappers//
const taskFormWrapper = document.getElementById('taskFormWrapper');
const projectFormWrapper = document.getElementById('projectFormWrapper');

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

        // create form data object //
        const taskFormData = new FormData(taskForm);
        const taskData = Object.fromEntries(taskFormData);

        //hide form//
        hideTaskForm();

        //log data to test//

        console.log(taskData);
    });
}

//project form submission//

export function submitProjectForm() {
    projectForm.addEventListener('submit', (event) => {
        //prevent refresh//
        event.preventDefault();

        // create form data object //
        const projectFormData = new FormData(projectForm);
        const projectData = Object.fromEntries(projectFormData);
        //hide form//
        hideTaskForm();

        //log data to test//
        console.log(projectData);
    });
}


