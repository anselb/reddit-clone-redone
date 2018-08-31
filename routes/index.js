var express = require('express');
var router = express.Router();

const Post = require('../models/post')

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}).then((posts) => {
    res.render('posts-index.hbs', { posts })
  }).catch((err) => {
    console.log(err.message)
  })
});

module.exports = router;
