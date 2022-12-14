import logo from './logo.svg';
import './App.css';
import React from 'react';

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}


const App = () => {
  const name = 'Jong';
  const age = 10;
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='name' age = {26 + 10}/>
      <Hello name='Kousuke' age = {age}/>
      <Footer />
    </div>
  )
}

export default App;
