import { toDos, projects } from './forms';

// Create a default project that will always exist
export const defaultProject = {
    id: 'default',
    title: 'Default Project',
    description: 'Default project for tasks without a specific project',
    priority: 'Medium'
};

// Get all available projects including the default project
export function getAllProjects() {
    // Check if any of the existing projects has id 'default'
    const hasDefaultProject = projects.some(project => project.id === 'default');
    
    // If no default project exists in the array, return a new array with default project
    if (!hasDefaultProject) {
        return [defaultProject, ...projects];
    }
    
    // Otherwise just return the projects array
    return projects;
}

// Get tasks for a specific project
export function getTasksForProject(projectId) {
    return toDos.filter(task => task.projectId === projectId);
}

// Get all projects with their task counts
export function getProjectsWithTaskCounts() {
    const projectsWithCounts = getAllProjects().map(project => {
        const taskCount = toDos.filter(task => task.projectId === project.id).length;
        return {
            ...project,
            taskCount
        };
    });
    
    return projectsWithCounts;
}

// Function to ensure the projectItem class has an id property
export function ensureProjectIds() {
    projects.forEach((project, index) => {
        if (!project.id) {
            // If a project doesn't have an ID, give it one
            project.id = `project-${Date.now()}-${index}`;
        }
    });
}

// Function to move a task to a different project
export function moveTaskToProject(taskIndex, projectId) {
    if (taskIndex >= 0 && taskIndex < toDos.length) {
        toDos[taskIndex].projectId = projectId;
        return true;
    }
    return false;
}