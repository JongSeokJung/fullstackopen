import {useState} from 'react'
import './App.css';
import React from 'react';

// part1 d
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = props => <div>{props.value}</div>

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
      {/* <button onClick={() => setToValue(1000)}>thousand</button>
      <button onClick={() => setToValue(0)}>reset</button>
      <button onClick={() => setToValue(value + 1)}>increment</button> */}
    </div>
  )
}

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = ({handleClick, text}) => {
//   return (
//     <button onClick={handleClick}>{text}</button>
//   )
// }


// const App = () => {
//   const [left, setLeft] = useState(0);
//   const [right, setRight] = useState(0);
//   const [allClicks, setAll] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left+1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right+1)
//   }

//   return (
//     <div>
//       {left}
//       <Button handleClick={handleLeftClick} text={"Left"}/>
//       <Button handleClick={handleRightClick} text={"Right"}/>
//       {right}
//       <History allClicks = {allClicks}/>
//     </div>
//   )
// }

// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   });

//   const handleLeftClick = () => {
//     setClicks({
//       ...clicks, left: clicks.left + 1
//     })
//   }

//   const handleRightClick = () => {
//     setClicks({
//       ...clicks, right: clicks.right + 1
//     })
//   }
//   return (
//     <div>
//       {clicks.left}
//       <button onClick = {handleLeftClick}>left</button>
//       <button onClick = {handleRightClick}>right</button>
//       {clicks.right}
//     </div>
//   )
// }




//part1 c
// const Display = ({counter}) => <div>{counter}</div>

// const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// const App = () => {
//   const [ counter, setCounter ] = useState(0);

//   const increaseByOne = () => setCounter(counter + 1)
//   const decreaseByOne = () => setCounter(counter - 1)
//   const setToZero = () => setCounter(0)

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button 
//         onClick = {increaseByOne}
//         text = 'plus'
//       />
//       <Button 
//         onClick = {setToZero}
//         text = 'zero'
//       />
//       <Button 
//         onClick = {decreaseByOne}
//         text = 'minus'
//       />
//     </div>
//   )
// }





// part1 a,b
// const Hello = ({name, age}) => {
//   const bornYear = () => new Date().getFullYear - age;

//   return (
//     <div>
//       <p>Hello {name}, you are {age} years old</p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const Footer = () => {
//   return (
//     <div>
//       greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
//     </div>
//   )
// }


// const App = () => {
//   const name = 'Jong';
//   const age = 10;
//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name={name} age = {26 + 10}/>
//       <Hello name='Kousuke' age = {age}/>
//       <Footer />
//     </div>
//   )
// }

export default App;
