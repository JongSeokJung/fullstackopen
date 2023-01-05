import { useState } from "react";
import Country from "./Country";
import ShowCountryInfo from "./ShowCountryInfo";

const CountriesBoard = ({countries, countryInput}) => {
  const filtered  = countries.filter(country => 
    country.name.common.toLowerCase().includes(countryInput.toLowerCase())
  )
  if (filtered.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (filtered.length === 1) {
    return (
      <ShowCountryInfo country={filtered[0]} />
    )
  }else {
    return(
      <div>
        <ul>
          {filtered.map((country, index) => {
            return (
              <Country key={index} country ={country} />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default CountriesBoard
