import { createPortal } from "react-dom"
import { useEffect , useRef} from "react"
export default function Modal ({children , open , onClose , classList = '' , ...props}) {
    const dialog = useRef()
    useEffect(() => {
        const modal = dialog.current
        if(open){
            modal.showModal()
        }
        return () => { modal.close() }
    } ,[open])
    return createPortal(
        <dialog ref = {dialog} className={`modal ${classList}`} onClose = {onClose} {...props}>
            {children}
        </dialog> ,
        document.getElementById('modal')
    )
}