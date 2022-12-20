import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonsForm'
import Persons from './components/Persons'

const Header = ({text}) => <h2>{text}</h2>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    let sameNameFlag = false;
    persons.forEach(person => {
      if (JSON.stringify(person.name.toLowerCase()) === JSON.stringify(newPerson.name.toLowerCase())) {
        alert(`${person.name} is already added to phonebook`)
        sameNameFlag = true;
      }
    })
    if (!sameNameFlag) {
      setPersons(persons.concat(newPerson))
    }
    setNewName("")
    setNewNumber("")
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value)
  }

  const personFilter = (event) => {
    event.preventDefault()
    if (filterName === "") {
      setShowFilter(false)
    } else {
      setShowFilter(true)
    }
  }

  const personsList = showFilter ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) : persons

  return (
    <div>
      <Header text="Phonebook" />
      <Filter onSubmit={personFilter} text="filter shown with" value={filterName} onChange={handleFilterName}/>

      <Header text="add a new" />

      <PersonForm 
        onSubmit={addPerson} 
        nameText={"name: "}
        newNameValue={newName}
        nameOnChange={handleNewName}
        numberText={"number: "}
        newNumberValue={newNumber}
        numberOnChange={handleNewNumber}
      />
      <Header text="Numbers" />
      <Persons personsList={personsList}/>
    </div>
  )
}

export default App