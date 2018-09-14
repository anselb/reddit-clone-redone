var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../app')
var should = chai.should()
chai.use(chaiHttp)

var agent = chai.request.agent(server)

var User = require('../models/user')

//login fail
describe('User', function() {
  it('should not be able to login if they have not registered', (done) => {
    agent
      .post('/login', { email: 'wrong@wrong.com', password: 'nope' })
      .end(function (err, res) {
        res.status.should.be.equal(401)
        done()
      })
  })
})

//sign up
it('should be able to sign up', (done) => {
  User.findOneAndRemove({ username: 'username' }, function() {
    agent
      .post('/sign-up')
      .send({ username: 'username', password: 'password' })
      .end(function (err, res) {
        console.log("RES.BODY")
        console.log(res.req._headers)
        res.should.have.status(200)
        //FIXME: cannot find cookies
        res.should.have.cookie('nToken')
        done()
      })
  })
})

//logout
it('should be able to logout', (done) => {
  agent
    .get('/logout')
    .end(function (err, res) {
      res.should.have.status(200)
      res.should.not.have.cookie('nToken')
      done()
    })
})

//login success
it('should be able to login', (done) => {
  agent
    .post('/login')
    .send({ username: 'username', password: 'password' })
    .end(function (err, res) {
      console.log(res.res)
      res.should.have.status(200)
      //FIXME: cannot find cookies
      res.should.have.cookie('nToken')
      done()
    })
})
