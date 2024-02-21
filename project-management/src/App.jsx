
import { useState } from "react"
import NoProjectSelected from "./components/no-project-selected.jsx"
import ProjectsSidebar from "./components/projectsidebar.jsx"
import NewProject from "./components/newproject.jsx"
import SelectedProject from "./components/selected-project.jsx"

const INITIAL_PROJECT_STATE = {
  selectedProjectId : undefined , 
  projects : [] ,
  tasks : []
}

function App() {
  const [projectState , setProjectState] = useState(INITIAL_PROJECT_STATE)

  function handleStartAddProject () {
    setProjectState ((prevStates) => {
      return {
          ...prevStates ,
          selectedProjectId : null
      }
    }) 
  }

  function handleCancelAddProject () {
    setProjectState ((prevStates) => {
      return {
          ...prevStates ,
          selectedProjectId : undefined
      }
    }) 
  }

  function handleAddProject (projectData) {
    const newProject = {
      ...projectData , 
      Id : Math.random()
    }
    setProjectState ((prevState) => {
      return {
        ...prevState ,
        selectedProjectId: newProject.Id ,
        projects : [...prevState.projects , newProject]
      }
    })
  }

  function handleSelectedProject (projectId) {
    setProjectState ((prevStates) => {
      return {
          ...prevStates ,
          selectedProjectId : projectId
      }
    }) 
  }
  function handleDeleteProject () {
    setProjectState ((prevStates) => {
      return {
          ...prevStates ,
          selectedProjectId: undefined ,
          projects : prevStates.projects.filter(project => project.Id !== projectState.selectedProjectId)
      }
    }) 
  }

  function handleAddTask (task) {
    const newTask = { 
      Id : Math.random() ,
      title : task ,
      projectId : projectState.selectedProjectId
    }
    setProjectState ((prevState) => {
      return {
        ...prevState ,
        tasks : [...prevState.tasks , newTask]
      }
    })
  }

  function handleDeleteTask (taskId) {
    setProjectState ((prevStates) => {
      return {
          ...prevStates ,
          tasks : prevStates.tasks.filter(task => task.Id !== taskId)
      }
    }) 

  }
  
  const selectedProject = projectState.projects.find(project => project.Id === projectState.selectedProjectId)
  const selectedTasks = projectState.tasks.filter(task => task.projectId === projectState.selectedProjectId)
  let content = <SelectedProject 
    project = {selectedProject} 
    tasks = {selectedTasks}
    onDeleteProject = {handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}/>

  if(projectState.selectedProjectId === null) {
    content = <NewProject onSaveProject = {handleAddProject} OnCancelProject = {handleCancelAddProject}/>
  }

  else if(projectState.selectedProjectId === undefined) {
    content =  <NoProjectSelected  onStartAddProject = {handleStartAddProject}/>
  }

  return (
    
    <main className="h-screen my-8 flex gap-8">
      
      <ProjectsSidebar 
        OnSelectProject={handleSelectedProject}
        onStartAddProject = {handleStartAddProject} 
        selectedProjectId={projectState.selectedProjectId}
        projects = {projectState.projects} />
        
      {content}

    </main>
  )
}

export default App
