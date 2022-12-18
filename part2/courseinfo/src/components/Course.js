const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(course => {
        return (
        <div key={course.id}>
          <Header title={course.name} />
          <Content parts={course.parts} />
        </div>
      )})}
      
    </div>
  )
}

const Header = ({title}) => {
  return <h1>{title}</h1>
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(element => 
        <p key={element.id}>{element.name} {element.exercises}</p>
      )}
      <Total parts={parts} />
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((s, p) => s+p.exercises, 0)
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

export default Courses