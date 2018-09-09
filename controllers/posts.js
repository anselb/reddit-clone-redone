const Post = require('../models/post')

module.exports = (app) => {
  //Get posts creation page
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })

  //Get individual post
  app.get('/posts/:id', (req, res) => {
    //Look up post
    Post.findById(req.params.id).populate('comments').then((post) => {
      res.render('posts-show.hbs', { post })
    }).catch((err) => {
      console.log(err.message)
    })
  })

  //Create a new post
  app.post('/posts/', (req, res) => {
    //Check if user is logged in
    if (req.user) {
      //Instatiate instance of post model
      var post = new Post(req.body)

      //Save instance of post model to db
      post.save((err, post) => {
        console.log(err)
        console.log(post)
        //Redirect to root
        return res.redirect('/')
      })
    } else {
      return res.status(401)
    }
  })
}
