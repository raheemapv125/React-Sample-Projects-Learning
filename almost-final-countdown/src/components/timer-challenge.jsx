import { useState , useRef } from "react"
import ResultModal from "./result-modal"

export default function TimerChallenge ({title , targetTime}) {
    const timerId = useRef()
    const dialog = useRef()

    const [timeRemaining , setTimeRemaining] = useState(targetTime * 1000)
    const isTimerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000

    //timer EXpired - lost the game
   if(timeRemaining <= 0 ){
        clearInterval(timerId.current)

        dialog.current.open()
   }

    function handleStart(){
        timerId.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10 )
        } , 10) 
       
    }
    function handleStop () {
        clearInterval(timerId.current)
        //timer Stopped -won the game
        dialog.current.open()
    }
    function handleRestart () {
        setTimeRemaining(targetTime * 1000)
    }

    return (
        <>
            {<ResultModal ref = {dialog} 
                targetTime={targetTime}
                remainingTime = {timeRemaining}
                onRestart = {handleRestart}/>}

            <section className = "challenge">
                <h2>{title}</h2>
                <p className="challenge-time">{targetTime} Second{(targetTime > 1) ? 's':''}</p>
                <p><button onClick={ isTimerActive ? handleStop : handleStart}>
                    {isTimerActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={isTimerActive ? 'active' : undefined}>
                    {isTimerActive ? 'Timer is Running...' : ' Timer Inactive'}</p>
            </section>
        </>
    )
}