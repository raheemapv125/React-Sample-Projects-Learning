import Button from "./button.jsx";

export default function ProjectsSidebar({onStartAddProject , projects , OnSelectProject ,selectedProjectId}) {
    return (
      <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
          Your Projects
        </h2>
        <div>
          <Button buttonText=" + Add Project "  onClick = {onStartAddProject} />
        </div>
        <ul className="mt-8">

          {projects.map(project => {
            let cssClasses = "w-full text-left px-2 py-1 my-1 rounded-sm hover:text-stone-200 hover:bg-stone-800"
            if(selectedProjectId === project.Id)
              cssClasses +=  ' text-stone-200 bg-stone-800'
            else 
              cssClasses += ' text-stone-400'

              return (
                <li key = {project.Id}>
                  <button onClick = {() => OnSelectProject(project.Id)} className={cssClasses}> 
                    {project.title} 
                  </button>
                </li> 
              )
          })}

        </ul>
      </aside>
    )
  }