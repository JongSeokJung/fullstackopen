const ErrorMessage = ({message}) => {
  if (message == null) {
    return null;
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const Confirmation = ({message}) => {
  if (message == null) {
    return null;
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

export {ErrorMessage, Confirmation }