import {useRef} from 'react'
import Input from "./input.jsx"
import Modal from './modal.jsx'

export default function NewProject ({onSaveProject, OnCancelProject}) {

    const dialog = useRef()

    const title = useRef()
    const description = useRef()
    const dueDate = useRef()

    function handleSave () {
        const enteredTitle = title.current.value
        const enteredDescription = description.current.value
        const enteredDueDate = dueDate.current.value
        if(enteredTitle === '' ||
            enteredDescription === '' ||
            enteredDueDate === '') {
            dialog.current.open()
            return
        }

        onSaveProject({
            title : enteredTitle , 
            description : enteredDescription,
            dueDate : enteredDueDate
        })
    }

    return (
        <>
        <Modal ref = {dialog}>
            <h2 className='text-xl font-bold text-stone-700 my-4'>Invalid Data</h2>
            <p className=' text-stone-600 mb-4'>Please Enter Values in All fields....</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end my-4">
                <li><button  onClick = {OnCancelProject} className="text-stone-800 hover:text-stone-950 mr-4">Cancel</button></li>
                <li><button onClick = {handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:text-stone-950">Save</button></li>
            </menu>
            <div>
                <Input type = 'text' label = "Title" ref={title}/>
                <Input label = "Description" textArea ref = {description}/>
                <Input type = 'date' label = "Due Date" ref = {dueDate}/>
            </div>
        </div>
        </>
    )
}