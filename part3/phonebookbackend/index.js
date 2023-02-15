// const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const idGen = () => Math.floor((Math.random() * 12) * 30)

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    let response = `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date}</p>`
    
    res.send(response)
})

app.get('/api/persons/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let person = persons.find(per => per.id === id)
    
    if (person) return res.json(person)
    else return res.status(404).json({error: "person not found"}).end()
})

app.post('/api/persons', (req, res) => {
    let person = req.body
    let perExis = persons.find(per => per.name === person.name)

    if (!person.name || !person.number) return res.status(400).json({error: "name or number is missing"}).end()
    else if (perExis) return res.status(409).json({error: "name must be unique"}).end()

    let newPerson = {
        id: idGen(),
        name: person.name,
        number: person.number
    }
    persons = persons.concat(newPerson)
    
    res.status(201).json(newPerson)
})

app.put('/api/persons/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let person = req.body
    let perExis = persons.find(per => per.id === id)
    let perConf = persons.find(per => (per.name === person.name && per.id !== id))
    
    if (!perExis) return res.status(400).json({error: "no person found with this id"}).end()
    else if (perConf) return res.status(400).json({error: "name in use by other id"}).end()

    let newPer = {
        id,
        name: person.name,
        number: person.number
    }
    persons = persons.map(per => {
        if (per.id !== id) return per
        else return newPer
    })
    
    res.status(200).json(newPer)
})

app.delete('/api/persons/:id', (req, res) => {
    let id = parseInt(req.params.id)
    persons = persons.filter(per => per.id !== id)
    
    res.status(204).end()
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
