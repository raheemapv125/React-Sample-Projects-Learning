import { useState , useRef} from "react"

export default function Player() {
  const inputPlayer = useRef()
  const [inputPlayerName , setInputPlayerName] = useState()

  function handleClick () {
    setInputPlayerName(inputPlayer.current.value)
  }
  return (
    <section id="player">
      <h2>Welcome {inputPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input type="text" 
          ref = {inputPlayer}
          defaultValue = {inputPlayerName}/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
