import "./styles.css";
import { add } from 'date-fns';
import {toDoItem, createToDoItem, updateToDoItem} from './toDoItem';
import {openTaskForm, openProjectForm, hideTaskForm, hideProjectForm, submitTaskForm, submitProjectForm} from './forms'


const testOne = createToDoItem("test note 2", "this is a test note", "9/7/24","low");

openTaskForm();

openProjectForm();

submitTaskForm();

submitProjectForm();
