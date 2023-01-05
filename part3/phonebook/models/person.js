const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to ', url)
mongoose.connect(url).then(result => {
  console.log('connected to DB')
}).catch(error => {
  console.log('error connecting to MongoDB', error)
})

const validation = (props) => {
  if (props.includes('-')) {
    if (props.length === 8) {
      return false;
    } else {
      return /\d{2,3}-\d/.test(props)
    }
  }
  return true
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: validation
  },
})



personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('person', personSchema)
module.exports = Person