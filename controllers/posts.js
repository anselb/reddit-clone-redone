module.exports = (app) => {
  //GET
  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })

  //CREATE
  app.post('/posts/new', (req, res) => {
    console.log(req.body)
  })
}
