const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')

module.exports = (app) => {
  //Create comment
  app.post('/posts/:postId/comments', function(req, res) {
    const comment = new Comment(req.body)
    comment.author = req.user._id

    comment.save().then((comment) => {
      return Post.findById(req.params.postId)
    }).then((post) => {
      post.comments.unshift(comment)
      return post.save()
    }).then((post) => {
      return User.findById(req.user._id)
    }).then((user) => {
      user.comments.unshift(comment)
      user.save()
      res.redirect('/')
    }).catch((err) => {
      console.log(err)
    })
  })
}
