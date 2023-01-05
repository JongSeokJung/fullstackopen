/* eslint-disable no-undef */
const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("Please provide the password as an argument: node mongo.js <password>")
  process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://jong0728:${password}@cluster0.i1ek76f.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

if (process.argv.length === 3) {
  mongoose.connect(url).then(() => {
    console.log("phonebook:")
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  mongoose.connect(url).then(() => {
    const person = new Person({
      name: name,
      number: number
    })
    return person.save()
  })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch(err => console.log(err))
}