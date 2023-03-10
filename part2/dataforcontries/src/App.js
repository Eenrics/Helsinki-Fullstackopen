import { useEffect, useState } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import Display from './components/Display'
import Notification from './components/Notification'

const App = () => { 

  const [countries, setCountries] = useState([])
  const [userinput, setUserinput] = useState('') 
  const [filtered, setFiltered] = useState([]) 
  const [details, setDetails] = useState([]) 
  const [weather, setWeather] = useState({}) 
  const [message, setMessage] = useState(null) 


useEffect(() => {
  countryService.getAll().then(
    data => {
      let names = data.map(d => d.name.common)
      setCountries(names)
      setMessage("Loading was successful !")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  )
}, [])

useEffect(() => {
  if (userinput) {
    setFiltered(
      countries.filter(country => RegExp(userinput).test(country.toLowerCase()))
    )
  }
}, [userinput])

useEffect(() => {
  if (filtered.length === 1) {
    countryService.getDetail(filtered).then(
      data => {
        setDetails([data[0]])
      }
    )
  } else {
    setDetails([])
  }
}, [filtered])

useEffect(() => {
  if (details.length === 1) {
    let lat = details[0].latlng[0]
    let lon = details[0].latlng[1]
    weatherService.getWeather(lat, lon)
    .then(data => {
      setWeather({temp: data.main.temp, wind: data.wind.speed, icon: data.weather[0].icon})
    })
  } else {
    setWeather({})
  }
}, [details])



const handleUserinput = (event) => {
  setUserinput(
    event.target.value.toLowerCase()
  )
}

const handleFilter = (country) => {
  setUserinput(
    country.toLowerCase()
  )
}



return ( 
  <div> 
    <Notification message={message}/>
    find countries <input value={userinput} onChange={handleUserinput} />
    {
      countries.length ? <Display 
                    userinput={userinput} 
                    filtered={filtered} 
                    handleFilter={handleFilter} 
                    details={details} 
                    weather={weather} /> : <p className='loading' >Please wait until the loading completes.</p>
    }
  </div> ) 
      }
      
export default App