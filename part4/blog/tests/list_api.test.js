const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  // delete all blogs
  await Blog.deleteMany({})
  const blogsObject = helper.blogs.map(r => new Blog(r))
  const promiseArray = blogsObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  try {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(helper.blogs.length)
  } catch (e) {
    next(e)
  }
})

test('all ids are unique', async ()=> {
  const blogs = await api.get('/api/blogs')
  expect(blogs.body[0]._id).toBeDefined()
})

test('a valid blog can be added to database', async () => {
  const blog = {
    title: "new blog",
    author: "Jong",
    url: "https://jong.com/",
    likes: 7,
    __v: 0
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  expect(blogAtEnd).toHaveLength(helper.blogs.length+1)

  const titles = blogAtEnd.map(blog => blog.title)
  expect(titles).toContain('new blog')
})

test('a blog without likes is added with 0 likes', async () => {
  const blog = {
    title: "test blog",
    author: "test1",
    url: "https://test.com"
  }

  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  expect(blogAtEnd).toHaveLength(helper.blogs.length+1)
  expect(blogAtEnd[helper.blogs.length].likes).toBe(0)
})

test('a blog without title or url is not added', async () => {
  const blogWithoutTitle = {
    author: "testTitle",
    url: "https://testAuthor.com"
  }

  const blogWithoutAuthor = {
    title: "testURL",
    author: "testURL",
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutAuthor)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogAtEnd = await helper.blogsInDb()
  expect(blogAtEnd).toHaveLength(helper.blogs.length)

  const blogTitles = blogAtEnd.map(blog => blog.title)
  expect(blogTitles).not.toContain("testURL")
  expect(blogTitles).not.toContain("testTitle")
})

afterAll(() => {
  mongoose.connection.close()
})