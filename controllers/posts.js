const Post = require('../models/post')

module.exports = (app) => {
  //GET
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })

  //CREATE
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
