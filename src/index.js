import "./styles.css";
import { add } from 'date-fns';
import {openTaskForm, openProjectForm, hideTaskForm, hideProjectForm, submitTaskForm, submitProjectForm} from './forms';
import { renderTasksTable, renderProjectsTable, populateProjectDropdown } from './tableRenderer';
import { ensureProjectIds } from './projectManagement';

// Initialize task form functionality
openTaskForm();
submitTaskForm();

// Initialize project form functionality
openProjectForm();
submitProjectForm();

// Initialize tables for existing data
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all projects have IDs before rendering
    ensureProjectIds();
    
    // Initialize the project dropdown in the task form
    populateProjectDropdown();
    
    // Render the tables
    renderProjectsTable();
    renderTasksTable();
});