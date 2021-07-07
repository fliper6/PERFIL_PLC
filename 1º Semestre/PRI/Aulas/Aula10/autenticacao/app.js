var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var {v4: uuidv4} = require('uuid');
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var axios = require('axios');

passport.use(new LocalStrategy(
  {usernameField:'id'}, function(id,password, done) {
    axios.get('http://localhost:3000/users/' + id)
      .then(dados => {
        const user = dados.data
        if(!user) {return done(null, false, {message: 'Utilizador Inexistente\n'})}
        if(password != user.password) {return done(null,false, {message: 'Credenciais Inválidas\n'})}
        return done(null, user)
      })
      .catch(erro => done(erro))
  }
))

passport.serializeUser((user,done) => {
  console.log('Vou serializar o user na sessao: ' + JSON.stringify(user))
  done(null, user.id)
})

passport.deserializeUser((uid, done) => {
  console.log("Vou desserializar o user na sessao: " + uid)
  axios.get('http://localhost:3000/users/' + uid)
    .then(dados => done(null, dados.data))
    .catch(erro => done(erro, false))
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(session({
  genid: req => {
    console.log('Estou dentro do middleware da sessao...')
    console.log(req.sessionID)
    return uuidv4()
  },
  secret: 'segredo de PRI2020',
  store: new FileStore(),
  resave: false,
  saveUninitialized: true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
