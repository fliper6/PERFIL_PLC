var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var jwt = require('jsonwebtoken')
var fs = require('fs')

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next) {
  fs.readFile('../auth-server/keys/pubkey.pem', function(e, publicKey) {
    jwt.verify(req.query.token, publicKey, { algorithms: ['RS256'] }, function(e, decoded) {
        if(e) res.status(401).jsonp({error: 'Nao se verificou o token, erro: ' + e})
        else {
          req.user = { level: decoded.level, username: decoded.username}
          console.log(JSON.stringify(decoded))
          next()
        }
    });
})
})

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
