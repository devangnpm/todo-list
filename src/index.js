import createProject from "./createProject.js";
import './style.css'; // Adjust the path to your actual CSS file location

// Your JavaScript code


// const Project1 = new createProject("Project1");
// const Project2 = new createProject("Project2");

// Project1.addTask('Task1','Go to Gym','2024-01-01','High');
// Project1.addTask('Task2','Watch Movie','2024-02-02','High');

// Project2.addTask('Task1','This is Task2','2024-03-03','Low');

// console.log(Project2.listTasks());
// console.log(Project2);

// renderProject(project.projectName);
// renderTasks(project.listTasks);

function addProject() {  
  const addBtn = document.querySelector(".project-btn");
  let projects = createProject.getProjectsFromLocalStorage();
  addBtn.addEventListener("click", () => {
    const projectName = prompt("Enter project name:");
    if (projectName) {
      const newProject = new createProject(projectName);
      projects.push(newProject);
      renderProject(projects);
      createProject.saveProjectToLocalStorage(projects); // Save to localStorage after taking userInput
    }
  });
}


function renderProject(projects) {
  const projectsContainer = document.querySelector(".projects-container");
  projectsContainer.innerHTML = ""; // Clear the container

  // Iterate through each project and create a tab
  projects.forEach((project) => {
    const projectTab = document.createElement("div");
    projectTab.classList.add("project-tab");
    projectTab.innerHTML = project.projectName;

    // Add click event to render tasks when a project is clicked
    projectTab.addEventListener("click", () => {
      renderTasks(project, project.listTasks());
    });

    projectsContainer.appendChild(projectTab);
  });

  // Re-append the add project button container
  const addProjectContainer = document.createElement("div");
  addProjectContainer.classList.add("add-project-container");
  const addButton = document.createElement("button");
  addButton.classList.add("project-btn");
  addButton.textContent = "+ Add Project";

  // Re-add event listener to add button
  addButton.addEventListener("click", () => {
    const projectName = prompt("Enter project name:");
    const newProject = new createProject(projectName);
    projects.push(newProject);
    renderProject(projects); // Re-render projects with the new project added
  });

  addProjectContainer.appendChild(addButton);
  projectsContainer.appendChild(addProjectContainer);
}

function renderTasks(project, todos) {
  const todosContainer = document.querySelector(".todos-container");
  todosContainer.innerHTML = " ";
  for (let i = 0; i < todos.length; i++) {
    const newTab = document.createElement("div");
    const taskDeleteBtn = document.createElement("BUTTON");
    taskDeleteBtn.className = "taskDeleteBtn";
    newTab.innerHTML = todos[i].taskDescription;
    console.log(newTab)
    newTab.className = "newTab";
    taskDeleteBtn.innerHTML = "Delete Task";

    newTab.appendChild(taskDeleteBtn);
    todosContainer.appendChild(newTab);

    taskDeleteBtn.addEventListener("click", () => {
      const taskDescription = todos[i].taskDescription; // Get the task description of the current task
      project.deleteTask(taskDescription); // Delete the task with the specified description
      renderTasks(project, project.listTasks()); // Re-render tasks
    });
  }

  const taskAddBtn = document.createElement("div");
  taskAddBtn.textContent = "+ Add Task";
  taskAddBtn.classList.add("taskAdd-Btn");
  todosContainer.appendChild(taskAddBtn);

  taskAddBtn.addEventListener("click", () => {
    const taskName = prompt("Enter task name:");
    const taskDescription = prompt("Enter task description:");
    if (taskName && taskDescription) {
      project.addTask(taskName, taskDescription, '2024-01-01', 'Medium'); // Add date and priority if needed
      let projects = createProject.getProjectsFromLocalStorage();
      projects = projects.map(proj => proj.projectName === project.projectName ? project : proj);
      createProject.saveProjectToLocalStorage(projects);
      renderTasks(project, project.listTasks());
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  const projects = createProject.getProjectsFromLocalStorage();
  renderProject(projects);
  addProject();
});


addProject();
