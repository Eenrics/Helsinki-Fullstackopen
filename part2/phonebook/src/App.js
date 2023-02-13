import { useEffect, useState } from 'react'
import personService from './services/persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => { 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('') 
  const [newNum, setNewNum] = useState('') 
  const [filter, setFilter] = useState(/./) 

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
    })
    .catch(err => alert(err))
}

return ( 
  <div> 
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