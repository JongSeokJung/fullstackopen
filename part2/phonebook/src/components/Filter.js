import InputBox from "./Inputbox"

const Filter = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <InputBox text={props.text} value={props.value} onChange={props.onChange} />
    </form>
  )
}

export default Filter