var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose')
var cors = require('cors')

var mongoDB = 'mongodb://127.0.0.1/myParaApp'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
var db = mongoose.connection

db.on('error', () => {console.log('MongoDB connection error...')})
db.once('open', ()=> {
  console.log('MongoDB connection successful!')
})

var indexRouter = require('./routes/index');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
  res.status(err.status || 500).jsonp(err);
});

module.exports = app;
