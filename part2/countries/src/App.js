import { useState, useEffect } from "react";
import axios from "axios";
import CountriesBoard from "./components/CountriesBoard";
import Filter from "./components/Filter";


function App() {
  let [countryInput, setCountryInput] = useState("")
  let [countries, setCountries] = useState([])

  const handleCountryInput = (event) => {
    setCountryInput(event.target.value);
  }

  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {setCountries(response.data)})
  }

  useEffect(hook, []);

  return (
    <div>
      <Filter value={countryInput} onChange={handleCountryInput} />
      <CountriesBoard countries={countries} countryInput={countryInput}/>
    </div>
  );
}

export default App;
