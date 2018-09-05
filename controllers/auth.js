const User = require('../models/user')

module.exports = (app) => {
  //Get sign up form
  app.get('/sign-up', (req, res) => {
    res.render('sign-up')
  })

  //Create user
  app.post('/sign-up', (req, res) => {
    const user = new User(req.body)

    user.save().then((user) => {
      res.redirect('/')
    }).catch((err) => {
      console.log(err.message)
    })
  })
}
