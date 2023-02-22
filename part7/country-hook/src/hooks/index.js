import { useState, useEffect } from "react"
import countryServices from '../services/countries'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
        if (name) {
            countryServices.getDetail(name)
            .then(response => setCountry(
                {
                    data: {
                        name: response.name.common, 
                        capital: response.capital, 
                        population: response.population, 
                        flag: response.flags.png
                    }, 
                    found: true
                }
                ))
            .catch((error) => setCountry(
                {
                    error, 
                    found: false
                }
                ))
        }
    }, [name])
  
    return country
  }