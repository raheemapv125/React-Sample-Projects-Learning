import noProjectImg from '../assets/no-projects.png'
import Button from './button.jsx'
export default function NoProjectSelected ({onStartAddProject}) {
    return (
        <div className="mt-24 text-center w-2/3 ">
            <img src = {noProjectImg} alt = "No Project Selected" className='w-16 h-16 object-contain mx-auto'/>
            <h2 className='text-xl font-bold text-stone-500 my-4'>No Project Selected</h2>
            <p className=' text-stone-400 mb-4'>Select a Project or Get Started with a New one.</p>
            <p className='mt-8'><Button buttonText="Create a New Project" onClick = {onStartAddProject} /></p>
        </div>
    )
}