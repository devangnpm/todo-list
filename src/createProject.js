import Task  from './Task.js';
class createProject {
    constructor(projectName) {
        this.projectName = projectName;
        let todos = []; // local variable to store todos
        this.todos = todos; // assigning local vaiable to instance property here
    }

    // function to add task
    addTask(taskName,taskDescription,dueDate,priority) {
        const task = new Task(taskName,taskDescription,dueDate,priority);
        this.todos.push(task);
    }

    //function to display the tasks
    listTasks() {
        return this.todos;
    }

    deleteTask(taskDescription) {
        this.todos = this.todos.filter(task => task.taskDescription !== taskDescription);
    }

    static saveProjectToLocalStorage(projects) {
        const projectsJSON = JSON.stringify(projects);
        localStorage.setItem('projects', projectsJSON);
    }

    static getProjectsFromLocalStorage() {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        return projects.map(project => {
          const newProject = new createProject(project.projectName);
          newProject.tasks = project.tasks;
          return newProject;
        });
      }
    
}
 

export default createProject;