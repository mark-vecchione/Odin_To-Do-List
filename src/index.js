import "./styles.css";
import { add } from 'date-fns';
import {toDoItem, createToDoItem, updateToDoItem} from './toDoItem';
import {showTaskForm, showProjectForm} from './forms'


const testOne = createToDoItem("test note 2", "this is a test note", "9/7/24","low");

// add event listener to new task button//

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
});

// add event listener to new project button//

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
});