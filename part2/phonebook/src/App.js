import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => { 
  const [persons, setPersons] = useState([ 
    { name: 'Arto Hellas', number: '040-123456', id: 1 }, 
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 }, 
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 }, 
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
const [newName, setNewName] = useState('') 
const [newNum, setNewNum] = useState('') 
const [filter, setFilter] = useState(/./) 

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

const handleSubmit = (event) => {
  event.preventDefault()
  if (persons.find(person => person.name === newName)) {
    window.alert(`${newName} is already added to phonebook`)
    return
  }
  let newPerson = {
    id: persons.length + 1,
    name: newName,
    number: newNum
  }
  setPersons(
    persons.concat(newPerson)
  )
  setNewName('')
  setNewNum('')
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
    <Persons persons={persons} filter={filter} />
  </div> ) 
      }
      
export default App