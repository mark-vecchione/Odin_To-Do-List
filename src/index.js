import "./styles.css";
import { add } from 'date-fns';
import {openTaskForm, openProjectForm, hideTaskForm, hideProjectForm, submitTaskForm, submitProjectForm, renderToDos,renderProjects, deleteButtons} from './forms'

openTaskForm();

openProjectForm();

submitTaskForm();

submitProjectForm();

renderToDos();

renderProjects();

deleteButtons();
