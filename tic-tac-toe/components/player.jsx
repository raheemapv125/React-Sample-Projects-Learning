import { useState } from "react"

export default function Player ({initialName , symbol , isActive , onUpdatePlayerName}) {
    const [isEditing , setisEditing] = useState(false)
    const [playerName , setPlayerName] = useState(initialName)
    function handleEditClick () {
        setisEditing(isEditing => !isEditing)
        if(isEditing) {
            onUpdatePlayerName (symbol , playerName)
        }
    }
    function handleSaveClick (event) {
        setPlayerName(event.target.value)
    }
    let playerEditableName = playerName
    if (isEditing)
        playerEditableName = < input  type = "text" value = {playerName}
            onChange = {handleSaveClick}/>
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className = "player">
                <span className="player-name">{ playerEditableName}</span>
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}