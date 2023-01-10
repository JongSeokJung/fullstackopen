const _ = require('loadsh')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach(blog => {
    likes += blog.likes
  });

  return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return []
  }
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {
  const max = _.maxBy(blogs, blog => blog.author)
  const numOfBlogs = blogs.filter(blog => max.author === blog.author).length
  return {
    author: max.author,
    blogs: numOfBlogs
  }
}
// need to work on this
const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, blog => blog.author)
  const keys = Object.keys(authors)
  const authorsLikes = []

  keys.forEach((key, index) => {
    const likes = authors[key].reduce((sum, curr) => {
      return sum + curr.likes
    }, 0)
    authorsLikes.push({
        author: key,
        likes: likes
      }
    )
  })

  const mostLikesAuthor = _.maxBy(authorsLikes, author => author.likes);
  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}