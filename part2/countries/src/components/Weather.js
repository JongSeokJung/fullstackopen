import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState({});
  const capital = country.capital[0]

  const weatherHook = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=imperial&appid=${api_key}`)
      .then(response => setWeather(response.data))
  }
  useEffect(weatherHook, []);

  return(
    <div>
      {Object.keys(weather).length !== 0 && (
        <>
          <h1>Weather in {capital}</h1>
          <p>temperature {weather.main["temp"]} Fahrenheit</p>
          <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} width="150" height="150"/>
          <p>wind {weather.wind.speed} mph</p>
        </>
      )}
    </div>
  )
}
export default Weather