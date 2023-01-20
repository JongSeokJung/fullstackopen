const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  if(!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  if (decodedToken.id !== blog.user.toString()) {
    return response.status(401).json({
      error: 'token is matched with id'
    })
  }
  await Blog.findByIdAndDelete(request.params.id)
    response.status(202).end()
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