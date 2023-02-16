const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
    let favBlog = {max: 0, ind: null}
  blogs.forEach((blog, ind) => {
    if (blog.likes > favBlog.max) {
      favBlog.max = blog.likes
      favBlog.ind = ind
    }
  })
  return blogs[favBlog.ind]
}

const mostBlogs = (blogs) => {
  let mostAuth = {}
  let Authers = {}

  blogs.forEach(blog => {
    if (blog.author in Authers) {
        Authers[blog.author] += 1
    } else {
        Authers[blog.author] = 1
    }
  })

  let maxBlog = Math.max(...Object.values(Authers)) 

  mostAuth.author = Object.keys(Authers).find(author => Authers[author] === maxBlog)
  mostAuth.blogs = maxBlog

  return mostAuth
}

const mostLikes = (blogs) => {
  let mostAuth = {}
  let Authers = {}

  blogs.forEach(blog => {
    if (blog.author in Authers) {
        Authers[blog.author] += blog.likes
    } else {
        Authers[blog.author] = blog.likes
    }
  })

  let maxBlog = Math.max(...Object.values(Authers)) 

  mostAuth.author = Object.keys(Authers).find(author => Authers[author] === maxBlog)
  mostAuth.likes = maxBlog

  return mostAuth
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}