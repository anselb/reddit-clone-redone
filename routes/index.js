var express = require('express');
var router = express.Router();

const Post = require('../models/post')

/* GET home page. */
router.get('/', function(req, res, next) {
  var currentUser = req.user

  Post.find({}).populate('author', 'username').then((posts) => {
    res.render('posts-index.hbs', { posts, currentUser })
  }).catch((err) => {
    console.log(err.message)
  })
});

module.exports = router;
