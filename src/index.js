import { add } from 'date-fns';
import {toDoItem, createToDoItem, updateToDoItem} from './toDoItem'

const testOne = createToDoItem("test note 2", "this is a test note", "9/7/24","low");

// add event listener to new task button//

const addTaskButton = document.querySelector('#addTaskButton');

addTaskButton.addEventListener('click',(event) => {
    //prevent refresh//
    event.preventDefault();

    //pop-up task form//

    //submit task//

    //create new to do item//
})
