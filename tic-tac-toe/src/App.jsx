import { useState } from "react"
import Player from "../components/player.jsx"
import GameBoard from "../components/game-board.jsx"
import Log from "../components/log.jsx"
import { WINNING_COMBINATIONS } from "./data/WINNING-COMBINATIONS.JSX"
import GameOver from "../components/gameover.jsx"

const INITIAL_GAMEBOARD = [
  [null , null ,null],
  [null , null ,null],
  [null , null ,null],
]
const PLAYER = {X : 'Player1' , O : 'Player2'}

function deriveCurrentPlayer(gameTurns){
  let currentPlayer = 'X'
  if(gameTurns.length > 0 && gameTurns[0].player === 'X')
    currentPlayer = 'O'
  
    return currentPlayer
}
function deriveGameBoard (gameTurns) {
  const gameBoard = [...INITIAL_GAMEBOARD.map(innerArray => [...innerArray])]
  gameTurns.forEach(turn => {
    const {square , player} = turn
    const {row, col} = square
    gameBoard[row][col] = player
  })
  return gameBoard
}
function deriveWinner(gameBoard , players) {
  let winner
  WINNING_COMBINATIONS.forEach(combination => {
    const firstSuareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSuareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSuareSymbol = gameBoard[combination[2].row][combination[2].column]
    if(firstSuareSymbol && 
      firstSuareSymbol === secondSuareSymbol && 
      firstSuareSymbol === thirdSuareSymbol) {
        winner = players[firstSuareSymbol]
      }
  })
  return winner
}

function App() {
  const [players , setplayer] = useState(PLAYER)
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveCurrentPlayer(gameTurns)

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard , players)

  const hasDraw = gameTurns.length === 9 && !winner

  function handleUpdatePlayerName (symbol , newName) {
    setplayer ((prevPlayers) => {
      return {...prevPlayers ,
        [symbol] : newName }
    })
  }

  function handleSelectSquare (rowIndex, colIndex) {
    setGameTurns ((prevTurns) => {
      const curPlayer = deriveCurrentPlayer(prevTurns)
      const updatedTurn = [
        {square : {row : rowIndex , col : colIndex} , player: curPlayer}, ...prevTurns]
      return updatedTurn
    })
  }

  function handleRematch(){
    setGameTurns([])
  }

  return (
   <menu>
    <section id = "game-container">
      <ol id = "players" className="highlight-player">
        <Player initialName={PLAYER.X} symbol = "X" isActive={activePlayer === 'X'}
          onUpdatePlayerName = {handleUpdatePlayerName}/>
        <Player initialName={PLAYER.O} symbol = "O" isActive={activePlayer === 'O'}
          onUpdatePlayerName = {handleUpdatePlayerName}/>
      </ol>

      { (winner || hasDraw) && <GameOver winner = {winner} onRematch = {handleRematch} /> }

      <GameBoard onSelectSquare = {handleSelectSquare} 
      board = {gameBoard}/>
    </section>
    <Log turns = {gameTurns}/>
   </menu>
  )
}

export default App
