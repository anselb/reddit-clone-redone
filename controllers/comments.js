const Comment = require('../models/comment')

module.exports = (app) => {
  //Create comment
  app.post('/posts/:postId/comments', function(req, res) {
    const comment = new Comment(req.body)

    comment.save().then((comment) => {
      return res.redirect('/')
    }).catch((err) => {
      console.log(err)
    })
  })
}
