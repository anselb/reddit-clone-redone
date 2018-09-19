var Post = require('../models/post')
var Comment = require('../models/comment')
var User = require('../models/user')

module.exports = app => {
  //Get comment creation page
  app.get('/posts/:postId/comments/:commentId/replies/new', (req, res) => {
    let post
    Post.findById(req.params.postId).then((p) => {
      post = p
      console.log(req.params);
      // return Comment.findById(req.params.commentId)
      return req.params.commentId
    }).then((comment) => {
      res.render('replies-new', { post, comment })
    }).catch((err) => {
      console.log(err.message)
    })
  })

  //Create a new comment
  app.post('/posts/:postId/comments/:commentId/replies', (req, res) => {
    console.log(req.body)
  })
}
