import InputBox from "./Inputbox"

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <InputBox text={props.nameText} value={props.newNameValue} onChange={props.nameOnChange} />
      <InputBox text={props.numberText} value={props.newNumberValue} onChange={props.numberOnChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm