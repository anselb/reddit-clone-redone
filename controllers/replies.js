const mongoose = require('mongoose')

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
    Post.findById(req.params.postId).then((post) => {
      //Get postId of parent post and save it with comment
      let postId = req.sanitize(req.params.postId)
      req.body.postId = postId
      //Set author to comment
      let author = req.user._id
      req.body.author = author
      //Find child comment of parent post and add the reply
      var comment = post.comments.id(req.params.commentId)
      console.log(req.body)
      comment.comments.unshift(req.body)
      post.markModified('comments')
      return post.save()
    }).then((post) => {
      res.redirect('/posts/' + post._id)
    }).catch((err) => {
      console.log(err.message)
    })
  })
}
