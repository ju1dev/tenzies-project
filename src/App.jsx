import { useState } from 'react'
import Die from './Die'
import './App.css'
import {nanoid} from 'nanoid'
function App() {

  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      let randomNumber = Math.floor(Math.random() * 7)
      newDice.push({value: randomNumber, isHeld: false, id: nanoid()})
    }
    return newDice
  }

  function holdDice(id) {
    console.log(id)
  }

  console.log(dice)
  const diceElements = dice.map(die => 
  <Die value={die.value}
       isHeld={die.isHeld}
       holdDice={() => holdDice(die.id)}
  >
  </Die>
  )
  console.log(dice)
  return (
    <main>
    <div className="dice-container">
        {diceElements}
    </div>
    <button className='roll-btn' onClick={()=> setDice(allNewDice())}>Roll</button>
</main>
  )
}

export default App
