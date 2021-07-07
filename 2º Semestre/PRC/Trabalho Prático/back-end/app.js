var createError = require('http-errors');
var express = require('express');
var path = require('path');
var passport = require('passport');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var LocalStrategy = require('passport-local').Strategy;
var User = require('./controllers/user')
var jwt = require('jsonwebtoken')


var {v4: uuidv4} = require('uuid');
var session = require('express-session');
const FileStore = require('session-file-store')(session);


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(
  {usernameField: 'username'}, (username,password,done) => {
    User.lookUp(username)
      .then(dados => {
        const user = dados
        if(user == undefined) { return done(null, false, {message: 'Username does not exist!\n'})}
        if(password != user.password) {return done(null, false, {message: 'Password not valid!\n'})}
        return done(null, user)
      })
      .catch(erro => done(erro))
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

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login')
var usersRouter = require('./routes/users');
var pubRouter = require('./routes/publicacoes');

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

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/publicacao', pubRouter)

app.use(function(req,res,next){
  var myToken = req.headers.authorization || req.body.token;
  jwt.verify(myToken, 'PRC2021', function(e,payload){
    if(e) {
      res.status(401).jsonp({error:'Erro na verificação do token: ' + e})
    }
    else {
      req.user = {username: payload.username}
      next()
    }
  })
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
  res.status(err.status || 500);
});

module.exports = app;
