import {useState , useEffect} from 'react'

export default function QuestionTimer ({timeout , onTimeout , mode}) {

    const [remainingTime , setRemainingTime] = useState(timeout)
    useEffect(() => {
        const timer = setTimeout(onTimeout , timeout)
        return () => {
            clearTimeout(timer)
            //console.log('timer stopped')
        }
    } , [onTimeout , timeout])
    useEffect (() => {
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 100)
        }, 100)
        return () => {
            clearInterval(interval)
            //console.log('interval stopped')
        }
    } , [])
    return (
        <progress id = '' value = {remainingTime} max = {timeout} className= {mode}/>
    )

}