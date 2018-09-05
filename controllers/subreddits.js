const Post = require('../models/post')

module.exports = (app) => {
  //Get subreddit index
  app.get('/n/:subreddit', function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).then((posts) => {
      res.render('posts-index.hbs', { posts })
    }).catch((err) => {
      console.log(err)
    })
  })
}
