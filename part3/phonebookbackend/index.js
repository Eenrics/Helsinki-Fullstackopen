require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Phone = require('./models/phone')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const idGen = () => Math.floor((Math.random() * 12) * 30)


app.get('/api/persons', (req, res) => {
    Phone.find({}).then(phone => {
        res.json(phone)
    })
})

app.get('/info', (req, res) => {
    Phone.find({})
        .then(phones => {
            let response = `<p>Phonebook has info for ${phones.length} people</p>
            <p>${new Date}</p>`
            res.send(response)
        })
})

app.get('/api/persons/:id', (req, res, next) => {
    Phone.findById(req.params.id)
    .then(phone => {
        if (phone) {
            return res.json(phone)
        } else {
            return res.status(404).json({error: "person not found"}).end()
        }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    let person = req.body
    let perExis = Phone.find({name: person.name}).then(data => console.log(data, typeof data))

    if (!person.name || !person.number) return res.status(400).json({error: "name or number is missing"}).end()
    else if (perExis.length) return res.status(409).json({error: "name must be unique"}).end()

    let phone = new Phone({name: person.name, number: person.number})
    phone.save()
      .then(response => {
        res.json(response)
      })
      .catch(error => {
        console.log("error saving data to mongodb", error.message)
      })
})

app.put('/api/persons/:id', (req, res, next) => {
    person = req.body

    let newPer = {
        name: person.name,
        number: person.number
    }

    Phone.findByIdAndUpdate(req.params.id, newPer, { new: true})
        .then(updatedPhon => {
          res.status(200).json(updatedPhon)
        })
        .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Phone.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
    console.log(err.message)

    if (err.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})
