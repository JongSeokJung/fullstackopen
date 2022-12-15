import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const StatisticLine = ({text, number}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
  )
  
}

const HeaderDisplay = ({text}) => <h1>{text}</h1>

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad
  let average = (good - bad)/ total
  let positive = good / total * 100

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticLine text="good" number={good} />
      <StatisticLine text="neutral" number={neutral} />
      <StatisticLine text="bad" number={bad} />
      <StatisticLine text="all" number={total} />
      <StatisticLine text="average" number={average} />
      <StatisticLine text="positive" number={positive + "%"} />
      </tbody>
    </table> 
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }
  const handleBad = () => {
    setBad(bad + 1);
  }

  let total = good + neutral + bad;

  return (
    <div>
      <HeaderDisplay text="give feedback" />
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <HeaderDisplay text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App