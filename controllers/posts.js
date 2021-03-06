const Post = require('../models/post')
const User = require('../models/user')

module.exports = (app) => {
  //Get posts creation page
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })

  //Get individual post
  app.get('/posts/:id', (req, res) => {
    //Look up post
    Post.findById(req.params.id)
      .populate('author', 'username')
      // Uncessary after moving from reference to embedded
      // .populate({
      //   path: 'comments',
      //   model: 'Comment',
      //   populate: {
      //       path: 'author',
      //       model: 'User'
      //   }
      // })
      .then((post) => {
      res.render('posts-show.hbs', { post })
    }).catch((err) => {
      console.log(err.message)
    })
  })

  //Create a new post
  app.post('/posts/', (req, res) => {
    //Check if user is logged in
    if (req.user) {
      // Clean everything
      req.body.title = req.sanitize(req.body.title)
      req.body.subreddit = req.sanitize(req.body.subreddit)
      req.body.url = req.sanitize(req.body.url)
      req.body.summary = req.sanitize(req.body.summary)

      //Instatiate instance of post model
      var post = new Post(req.body)
      post.author = req.user._id

      //Save instance of post model to db
      post.save().then((post) => {
        return User.findById(req.user._id)
      }).then((user) => {
        user.posts.unshift(post)
        user.save()
        res.redirect('/posts/' + post._id)
      }).catch((err) => {
        console.log(err.message)
      })
    } else {
      return res.status(401)
    }
  })
}
