import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const DisplayAnecdotes = ({anecdotes}) => <div>{anecdotes}</div>

const DisplayVote = ({votes}) => <div>has {votes} votes</div>

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const [mostVote, setMostVote] = useState(0)

  const getRandomQuote = () => {
    const num = Math.floor(Math.random() * anecdotes.length)
    setSelected(num);
  }

  const increaseVote = (n) => {
    const copy = [...votes]
    copy[n] += 1;
    if (copy[n] > copy[mostVote]) {
      setMostVote(n);
    }
    setVotes(copy)
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <DisplayAnecdotes anecdotes={anecdotes[selected]} />
      <DisplayVote vote={votes[selected]} />
      <Button handleClick={() => increaseVote(selected)} text="votes" />
      <Button handleClick={getRandomQuote} text="Random" />
      <Header text="Anecdote with most votes" />
      <DisplayAnecdotes anecdotes={anecdotes[mostVote]} />
      <DisplayVote vote={votes[mostVote]} />
    </div>
  )
}

export default App