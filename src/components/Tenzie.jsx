import React, { useState,useEffect } from 'react'
import Die from './Die'
import Confetti from 'react-confetti'
//import Confetti from 'react-confetti/dist/types/Confetti'

const Tenzie = () => {
  const [dice, setDice] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)

  //generate random number
  function randomdieNum (){
    return Math.ceil(Math.random() * 6)
  }
  // create new dice array
  function allNewDice(){
    const newArray = []
    //another way of creating new array with using for loop
    //const newArray = Array.from({ length: 10 }, () => randomdieNum());
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: randomdieNum(),
        held: false,
        id: i + 1
      };
      newArray.push(newDie)
    }
    return newArray
  }
  function rollUnheldDice() {
    if (!tenzies) {
      setDice((olddice) => olddice.map((die, index) => (
        die.held ? die : {value:randomdieNum(), held:false, id:index+1}
      )))
    }else{
      setDice(allNewDice())
      setTenzies(false)
    }
  }
  function holdDice(id) {
    setDice((prevdice) => prevdice.map(die =>{
      return die.id === id ? {...die, held:!die.held} : die
    }))
    //console.log(id)
  }
  const diceElement = dice.map((die) => (
    <Die key={die.id} {...die} hold={() =>{holdDice(die.id)}}/>
  ));
  console.log(dice)
  useEffect(() =>{
    const firstvalue = dice[0].value
    const allheld = dice.every(die => die.held)
    const allsame = dice.every(die => die.value === firstvalue)
    if (allheld && allsame) {
      setTenzies(true)
    }
  },[dice])
  return (
    <div className='tenzies'>
      {tenzies && <Confetti/>}
        <div className='TenzieHero'>
            <h2>Tenzies</h2>
            <p>Roll until all dice are the same. Click each die to freeze
                it at its current value between rolls
            </p>
        </div>
        <div className='die-container'>
          {diceElement}
        </div>
        <button type="button" onClick={rollUnheldDice} className='roll-dice'>
          {tenzies ? "Reset" : "Roll"}
        </button>
    </div>
  )
}

export default Tenzie