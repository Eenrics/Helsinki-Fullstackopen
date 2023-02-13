import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => { 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNum, setNewNum] = useState('') 
  const [filter, setFilter] = useState(/./) 
  const [message, setMessage] = useState('') 
  const [messageStatus, setMessageStatus] = useState('') 

useEffect(() => {
  personService.getAll().then(
    data => setPersons(data)
  )
}, [])

const handleNewName = (event) => {

  setNewName(
    event.target.value
  )
}

const handleNewNum = (event) => {
  setNewNum(
    event.target.value
  )
}

const handleFilter = (event) => {
  setFilter(
    RegExp(event.target.value.toLowerCase())
  )
}

const handleUpdate = (person, newPerson) => {
  personService.updatePerson(newPerson, person.id)
    .then(data => {
      setPersons(
        persons.map(p => p.id !== person.id ? p : data)
        )
      setNewName('')
      setNewNum('')
      setMessage(`${data.name} updated.`)
      setMessageStatus('success')
      setTimeout(() => {
        setMessage(null)
        setMessageStatus(null)
      }, 5000)
    })   
}

const handleSubmit = (event) => {
  event.preventDefault()

  let newPerson = {
    name: newName,
    number: newNum
  }

  let person = persons.find(person => person.name === newName)
  if (person) {
    let confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)
    if (confirm) handleUpdate(person, newPerson)
    return
  }

  personService.addPerson(newPerson)
    .then(data => {
      setPersons(persons.concat(data))
      setNewName('')
      setNewNum('')
      setMessage(`Added ${data.name}.`)
      setMessageStatus('success')
      setTimeout(() => {
        setMessage(null)
        setMessageStatus(null)
      }, 5000)
    })
}


const handleDelete = (id) => {
  let per = persons.find(p => p.id === id)
  const confirm = window.confirm(`Delete ${per.name}?`)
  if (!confirm) return null
  personService.deletePerson(id)
    .then(() => {
      setPersons(
        persons.filter(person => id !== person.id)
      )
      setMessage(`${per.name} removed!`)
      setMessageStatus('danger')
      setTimeout(() => {
        setMessage(null)
        setMessageStatus(null)
      }, 5000)
    })
    .catch(err => {
      setPersons(
        persons.filter(person => id !== person.id)
      )
      setMessage(`${per.name} has aleady been removed from server!`)
      setMessageStatus('danger')
      setTimeout(() => {
        setMessage(null)
        setMessageStatus(null)
      }, 5000)
    })
}

return ( 
  <div> 
    <Notification message={message} type={messageStatus} />
    <h2>Phonebook</h2> 
    <Filter handleChange={handleFilter} />
    <h2>add a new</h2> 
    <PersonForm 
      handleSubmit={handleSubmit} 
      handleNewName={handleNewName} 
      handleNewNum={handleNewNum} 
      newName={newName} 
      newNum={newNum} 
    />
    <h2>Numbers</h2> 
    <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
  </div> ) 
      }
      
export default App