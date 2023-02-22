import { useState, useEffect } from "react"
import axios from 'axios'

let token = null


export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }
  
    return {
      type,
      value,
      onChange,
      "data-res": {reset}
    }
  }

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(response => setResources(response.data))
  },[])

  const create = (resource) => {
    const config = {
        headers: { Authorization: token },
      }
    axios.post(baseUrl, resource, config).then(response => setResources(resources.concat(response.data)))
  }

  const update = (resource) => {
    const config = {
        headers: { Authorization: token },
      }
    axios.put(`baseUrl${resource.id}`, resource, config).then(response => setResources(resources.map(resource => resource.id !== response.id ? resource : response)))
  }

  const service = {
    create, update
  }

  return [
    resources, service
  ]
}
  