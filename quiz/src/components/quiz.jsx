import QUESTIONS from '../questions.js'
import Summary from './summary.jsx'
import {useCallback, useState} from 'react'
import Question from './question.jsx'

export default function Quiz  () {
    const [userAnswers , setUserAnswers] = useState([])
    const activeQuestionIndex = userAnswers.length
    const isQuizComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback((answer) => {
        setUserAnswers(prevAnswers => [...prevAnswers , answer])
    
    } , [])

    const handleSkipAnswer = useCallback(() => {handleSelectAnswer(null)} , [handleSelectAnswer])

    if (isQuizComplete) {
        return (
            <Summary userAnswers = {userAnswers}/>
        )
    }

    return (
        <div id = 'quiz'>
            <Question 
            key = {activeQuestionIndex}
            index = {activeQuestionIndex}
            onSelectAnswer={handleSelectAnswer}
            onSkipAnswer = {handleSkipAnswer}
            />

        </div>
    )
}