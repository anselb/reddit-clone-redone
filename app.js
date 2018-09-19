var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
require('dotenv').config()

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/redditclone2', { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
mongoose.set('debug', true)

//Custom middleware to check auth
var checkAuth = (req, res, next) => {
  console.log("Checking authentication")
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null
  } else {
    var token = req.cookies.nToken
    var decodedToken = jwt.decode(token, { complete: true } || {})
    req.user = decodedToken.payload
  }
  next()
}
app.use(checkAuth)

app.use('/', index);
app.use('/users', users);

require('./controllers/posts')(app);
require('./controllers/subreddits')(app);
require('./controllers/comments')(app);
require('./controllers/replies')(app);
require('./controllers/auth')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
