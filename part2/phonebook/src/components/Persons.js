const Persons = (props) => {
  return (
    <div>
      {props.personsList.map(person => <div key={person.id}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default Persons