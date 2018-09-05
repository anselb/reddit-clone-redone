const Post = require('../models/post')

module.exports = (app) => {
  //Get individual post
  app.get('/posts/:id', (req, res) => {
    //Look up post
    Post.findById(req.params.id).then((post) => {
      res.render('posts-show.hbs', { post })
    }).catch((err) => {
      console.log(err.message)
    })
  })

  //Get posts creation page
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })

  //Create a new post
  app.post('/posts/', (req, res) => {
    //Instatiate instance of post model
    var post = new Post(req.body)

    //Save instance of post model to db
    post.save((err, post) => {
      console.log(err)
      console.log(post)
      //Redirect to root
      return res.redirect('/')
    })
  })
}
