var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser')

var {v4: uuidv4} = require('uuid');
var session = require('express-session');
const FileStore = require('session-file-store')(session);

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var mongoDB = 'mongodb://127.0.0.1/tppridb'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false})
var db = mongoose.connection

db.on('error', ()=> {console.log('MongoDB connection error...')})
db.once('open' , ()=> {console.log('MongoDB connection successful...')})

var User = require('./controllers/user')

//Confiugração da estratégia local
passport.use(new LocalStrategy(
  {usernameField: 'username'}, (username,password,done) => {
    User.lookUp(username)
      .then(dados => {
        const user = dados
        if(!user) { return done(null, false, {message: 'Utilizador inexistente!\n'})}
        if(password != user.password) {return done(null, false, {message: 'Credênciais inválidas!\n'})}
        return done(null, user)
      })
      .catch( erro => done(erro))
  }
))

// Indica-se ao passport como serializar o utilizador
passport.serializeUser((user,done) => {
  console.log('Serialização, id: ' + user.username)
  done(null, user.username)
})

// Desserialização : a partir do id obtém-se a informação do utilizador
passport.deserializeUser((uname,done) => {
  console.log('Desserialização, id: ' + uname)
  User.lookUp(uname)
    .then(dados => done(null,dados))
    .catch(erro => done(erro, false))
})

var usersRouter = require('./routes/users');

var app = express();

app.use(session({
  genid: req => {
    return uuidv4()
  },
  stor: new FileStore({retries: 2}),
  secret: 'O meu segredo',
  resave: false,
  saveUninitialized: false
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('O meu segredo'));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  console.log('Signed Cookies: ' , JSON.stringify(req.signedCookies))
  console.log('Session: ' , JSON.stringify(req.session))
  next()
})

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
  res.status(err.status || 500).jsonp({error: err.message});
});

module.exports = app;
