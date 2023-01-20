const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, password, name } = request.body

  const existingUser = await User.findOne({username})
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }
  if (!password) {
    return response.status(400).json({
      error: 'password is required'
    })
  }
  if (password.length < 3) {
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const user = new User({
      username,
      passwordHash,
      name
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(e) {
    next(e)
  }
})

module.exports = usersRouter