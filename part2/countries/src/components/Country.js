import { useState } from "react"
import ShowCountryInfo from "./ShowCountryInfo";

const Country = ({country}) => {
  const [state, setState] = useState(false);

  const handleState = () => {
    setState(!state)
  }
  return (
    <li>
      {country.name.common} <button onClick={handleState}>show</button>
      {state && <ShowCountryInfo country={country}/>}
    </li>
  )
}

export default Country