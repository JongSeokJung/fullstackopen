const Filter = ({value, onChange}) => {

  const onSubmit = (event) => {
    event.preventDefault()
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          find countries <input value={value} onChange={onChange} />
        </div>
      </form>
    </div>
  )
}

export default Filter