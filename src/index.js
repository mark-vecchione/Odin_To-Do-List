import "./styles.css";
import { add } from 'date-fns';
import {openTaskForm, openProjectForm, hideTaskForm, hideProjectForm, submitTaskForm, submitProjectForm} from './forms';
import { renderTasksTable, renderProjectsTable } from './tableRenderer';

// Initialize task form functionality
openTaskForm();
submitTaskForm();

// Initialize project form functionality
openProjectForm();
submitProjectForm();

// Initialize tables for existing data
document.addEventListener('DOMContentLoaded', () => {
    renderTasksTable();
    renderProjectsTable();
});