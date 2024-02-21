import UserInput from "../components/user-input.jsx"
import Result from "../components/result.jsx"
import { useState } from "react"

const INVEST_DETAILS = {
  initialInvestment : 1000,
  annualInvestment : 100,
  expectedReturn : 6,
  duration : 12,
}
function App() {
  const [ userInput , setUserInput ] = useState (INVEST_DETAILS)
  const isValidInput = userInput.initialInvestment > 1 && 
    userInput.annualInvestment > 1 && 
    userInput.expectedReturn > 1 
    && userInput.duration > 1

  function handleChangeInput (inputIdentifier , newValue) {
    setUserInput (prevInput => {
      return {
        ...prevInput ,
        [inputIdentifier] : +newValue
      }
    })
  }
  return (
   <>
   <UserInput inputData = {userInput} onChangeInput  = {handleChangeInput}/>
   {!isValidInput && <p className="center">Please Enter Positive Numbers for data ... </p> }
   {isValidInput && <Result inputData = {userInput}/> }
   
   </>
  )
}

export default App
