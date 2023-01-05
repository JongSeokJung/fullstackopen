import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonsForm'
import Persons from './components/Persons'
import personManagement from './services/Management'
import { ErrorMessage, Confirmation } from './components/Notifications'

const Header = ({text}) => <h2>{text}</h2>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirmation, setConfirmation] = useState(null)

  useEffect(() => {
    personManagement.getAll()
      .then(persons => setPersons(persons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const currPerson = persons.filter((person) => person.name === newName)

    if (currPerson.length) {
      console.log("here")
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personManagement.updatePerson(currPerson[0].id, newPerson).then(deletePerson => {
          setPersons(persons.map(person => person.id !== deletePerson.id ? person : deletePerson));
        })
      }
    } else {
      personManagement.addPerson(newPerson)
        .then(person => {
          setPersons(persons.concat(person))
          setConfirmation(`Added ${newPerson.name}`)
          setTimeout(() => {
            setConfirmation(null)
          }, 2000)
        }).catch(error => {
          console.log(error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
      
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

  const deletePersonOf = ({id, name}) => {
    if (window.confirm(`Delete ${name}`)) {
      personManagement.deletePerson(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== id))
        setConfirmation(`${name} was removed from the server`)
        setTimeout(() => {
          setConfirmation(null)
        }, 2000)
      })
      .catch(error => {
        setErrorMessage(`Information of ${name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000)
      })
    }
  }

  const personsList = showFilter ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase())) : persons

  return (
    <div>
      <Header text="Phonebook" />
      <Confirmation message={confirmation} />
      <ErrorMessage message={errorMessage} />
      <Filter 
        onSubmit={personFilter} 
        text="filter shown with" 
        value={filterName} 
        onChange={handleFilterName}
      />
      <Header text="add a new" />
      <PersonForm 
        onSubmit={addPerson} 
        newNameValue={newName}
        nameOnChange={handleNewName}
        newNumberValue={newNumber}
        numberOnChange={handleNewNumber}
      />
      <Header text="Numbers" />
      <Persons personsList={personsList} deletePersonOf={deletePersonOf}/>
    </div>
  )
}

export default App