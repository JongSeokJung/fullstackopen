/* eslint-disable no-undef */
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const Person = require("./models/person")

const app = express()

app.use(express.json())
app.use(express.static("build"))

morgan.token("body", req => {
  return JSON.stringify(req.body)
})
app.use(morgan(":method :url :status :res[content-length] :response-time ms :body"))

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

app.get("/api/persons", (request, response) => {
  Person.find({}).then(res => {
    response.json(res)
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id).then(res => {
    if (res) {
      response.json(res)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.get("/info", (request, response) => {
  const personsNum = persons.length
  response.send(`<p>Phonebook has info for ${personsNum} people</p><p>${new Date()}</p>`)
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number || ""
  })
  person.save().then(res => {
    response.json(res)
  }).catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body
  const person = {
    number : body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, { new : true })
    .then(updated => {
      response.json(updated)
    })
    .catch(error =>  next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || "8080"
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
})