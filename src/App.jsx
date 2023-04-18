import { useState, useEffect } from 'react'
import Die from './Die'
import './App.css'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld & allSameValue) {
      setTenzies(true)
      console.log('You Won !')
    } else {
      setTenzies(false)
    }
  }, [dice])

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function generateNewDie() {
    return ({
      value: Math.floor(Math.random() * 7), 
      isHeld: false, 
      id: nanoid()
    })
    }


  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  function winGame() {
    const winDice = []
    for(let i = 0; i < 10; i++) {
      winDice.push({
      value: 1, 
      isHeld: true, 
      id: nanoid()
      })
    }
    return setDice(winDice)
  }
  
  const diceElements = dice.map(die => 
  <Die value={die.value}
       isHeld={die.isHeld}
       holdDice={() => holdDice(die.id)}
  >
  </Die>
  )
  
  return (
    <main>
      {tenzies == true && <Confetti width={window.innerWidth} height={window.innerHeight}/>}
    <div className='introduction'>
      <h1>Tenzies</h1>
      <p className='description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    </div>

    <div className="dice-container">
        {diceElements}
    </div>
    {!tenzies ? <button className='roll-btn' onClick={rollDice}>Roll</button> 
    :
    <button className='roll-btn' onClick={() => setDice(allNewDice)}>Reset</button>
    }
    <button onClick={winGame}></button>
</main>
  )
}

export default App
