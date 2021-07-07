var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');
var jwt = require('jsonwebtoken');

var mongoDB = 'mongodb://127.0.0.1/tppridb'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false})
var db = mongoose.connection

db.on('error', ()=> {console.log('MongoDB connection error...')})
db.once('open' , ()=> {console.log('MongoDB connection successful...')})

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req,res,next){
  var myToken = req.query.token || req.body.token;
  jwt.verify(myToken, 'PRI2020', function(e,payload){
    if(e) res.status(401).jsonp({error:'Erro na verificação do token: ' + e})
    else {
      req.user = {level: payload.level, username: payload.username}
      next()
    }
  })
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.status(err.status || 500).jsonp(err);
});

module.exports = app;
