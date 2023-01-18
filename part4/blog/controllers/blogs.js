const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(202).end()
  } catch(e) {
    next(e)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const update = request.body

  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, update, {new: true})
    response.json(updated)
  } catch(e) {
    next(e)
  }
})

module.exports = blogRouter