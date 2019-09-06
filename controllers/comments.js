const Comment = require('../models/comment')
const Post = require('../models/post')
const User = require('../models/user')

module.exports = (app) => {
  //Create comment
  app.post('/posts/:postId/comments', async function (req, res) {
    //Get postId of parent post and save it with comment
    let postId = req.params.postId
    req.body.postId = await Post.findById(postId)

    const comment = new Comment(req.body)
    comment.author = await User.findById(req.user._id)

    Post.findById(req.params.postId).exec(function (err, post) {
      post.comments.unshift(comment)
      post.save()

      User.findById(req.user._id).exec(function (err, user) {
        user.comments.unshift(comment)
        user.save()
      })

      return res.redirect('/posts/' + post._id)
    })

    //For old comment creation with reference document strategy
    //
    // comment.save().then((comment) => {
    //   return Post.findById(req.params.postId)
    // }).then((post) => {
    //   post.comments.unshift(comment)
    //   return post.save()
    // }).then((post) => {
    //   return User.findById(req.user._id)
    // }).then((user) => {
    //   user.comments.unshift(comment)
    //   user.save()
    //   res.redirect('/')
    // }).catch((err) => {
    //   console.log(err)
    // })
  })
}
