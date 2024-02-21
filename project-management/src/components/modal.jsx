import { useRef , forwardRef , useImperativeHandle } from "react"
import { createPortal } from "react-dom"
import Button from "./button.jsx"

const Modal = forwardRef( function Modal ({children} , ref) {
    const dialog = useRef()
    useImperativeHandle(ref , () => {
        return {
            open () {
                dialog.current.showModal()
            }
        }
    })
    return createPortal(
        <dialog ref = {dialog} className="backdrop:bg-stone-900/90 rounded-md p-4 shadow-md">
            {children}
            <form method = 'dialog' >
                <Button buttonText = 'Got it' />
            </form>
        </dialog> , 
        document.getElementById('modal-root')
    )
})
export default Modal