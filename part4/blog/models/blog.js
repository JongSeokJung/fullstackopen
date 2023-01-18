const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  }
  ,
  likes: {
    type: Number,
    required: false,
    default: 0
  }
})

module.exports = mongoose.model('Blog', blogSchema)