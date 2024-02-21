import { useRef , forwardRef , useImperativeHandle } from "react"
import { createPortal } from "react-dom"

const ReSultModel = forwardRef(function ResultModal ({ targetTime, remainingTime, onRestart} , ref) {
    
    const dialog = useRef()
    const isLost = remainingTime <= 0
    let formattedRemainingTime = 0
    let score 
    if(!isLost){
        formattedRemainingTime = (remainingTime / 1000).toFixed(2)
        score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100)
    }

    useImperativeHandle(ref , () => {
        return {
            open () {
                dialog.current.showModal()
            }
        }
    })

    return createPortal(
        <dialog ref= {dialog} onClose = {onRestart} className="result-modal">
            {isLost && <h2>You Lost</h2>}
            {!isLost && <h2> Your Score : {score}</h2>}

            <p>The Target Time was <strong> {targetTime} Seconds. </strong></p>
            <p>You stopped the Timer with 
                 <strong> {formattedRemainingTime} seconds left.</strong>
            </p>
            <form method="dialog" onSubmit={onRestart}>
                <button>Close</button>
            </form>
        </dialog> ,
        document.getElementById('modal')
    )
    })

    export default ReSultModel