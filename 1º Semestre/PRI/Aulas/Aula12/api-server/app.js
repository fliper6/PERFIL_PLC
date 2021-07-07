var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index');

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Tarefas2021', 
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB...'));
db.once('open', function() {
  console.log("Conexão ao MongoDB realizada com sucesso...")
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// (1) Pipeline de verificação do token (verificação com segredo)
// Para adicionar mais restrições (p.e., só os admin conseguirem aceder a alguma coisa) pomos isso na rota e deixamos isto como está)
app.use(function(req,res,next) {
  var myToken = req.query.token || req.body.token // podemos ir buscar o token à query (link) ou no body 
  jwt.verify(myToken, "PRI2020", function(e, decoded) {
      if(e) res.status(401).jsonp({error: 'Nao se verificou o token, erro: ' + e})
      else {
        req.user = { level: decoded.level, username: decoded.username}
        next()
      }
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
  res.status(err.status || 500).jsonp({error: err.message})
});

module.exports = app;
