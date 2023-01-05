import Weather from "./Weather"

const ShowCountryInfo = ({country}) => {
  const languages = Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
      </div>
      <h3>languages:</h3>
      <ul>
        {languages}
      </ul>
      <img src={country.flags.png} width="150" height="150"/>
      <Weather country={country} />
    </div>
  )
}

export default ShowCountryInfo