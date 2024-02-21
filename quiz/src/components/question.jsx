import QUESTIONS from '../questions.js'
import QuestionTimer from './question-timer.jsx'
import Answers from './answers.jsx'
import { useState } from 'react'
export default function Question ({index , onSelectAnswer , onSkipAnswer}) {
    const [answer , setAnswer] = useState ({
        selectedAnswer : '' ,
        isCorrect : null
    })

    let timer = 10000
    if(answer.selectedAnswer) {
        timer = 1000
    }
    if(answer.isCorrect !== null) {
        timer = 2000
    }

    function handleSelectAnswer (answer) {
        setAnswer ({
            selectedAnswer : answer ,
            isCorrect : null
        })
        setTimeout (() => {
            setAnswer ({
                selectedAnswer : answer ,
                isCorrect : answer === QUESTIONS[index].answers[0]
            })
            setTimeout(() => {
                onSelectAnswer(answer)
            } , 2000)
        } , 1000)
    }

    let answerState = ''
    if(answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong'
    }
    else if(answer.selectedAnswer) {
        answerState = 'answered'
    }

    return (
        <div id = 'question'>
        <QuestionTimer 
            key = {timer}
            timeout= {timer}
            onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
            mode = {answerState}
        />
        <h2>{QUESTIONS[index].text}</h2>
        <Answers 
            answers = {QUESTIONS[index].answers}
            selectedAnswer = {answer.selectedAnswer}
            answerState = {answerState}
            onSelect = {handleSelectAnswer} />
    </div>
    )
}