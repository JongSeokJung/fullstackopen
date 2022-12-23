const Persons = ({personsList, deletePersonOf}) => {
  return (
    <div>
      {personsList.map(person => {
        return (
          <div key={person.id}>
            {person.name} {person.number} <button onClick={() => deletePersonOf(person)}>delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default Persons
