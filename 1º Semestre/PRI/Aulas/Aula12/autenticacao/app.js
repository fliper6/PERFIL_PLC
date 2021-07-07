var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var { v4: uuidv4 } = require('uuid');
var session = require('express-session');
const FileStore = require('session-file-store')(session);

var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var mongoose = require('mongoose');

// BD = Tarefas2021, igual à do api-server (porque se decidiu dessa maneira, poderiamos ter 2 diferentes)
mongoose.connect('mongodb://127.0.0.1:27017/Tarefas2021', 
      { useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000});
  
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB...'));
db.once('open', function() {
  console.log("Conexão ao MongoDB realizada com sucesso...")
});

var User = require('./controllers/user')

// Configuração da estratégia local
passport.use(new LocalStrategy(
  {usernameField: 'username'}, (username, password, done) => {
    User.consultar(username)
      .then(dados => {
        const user = dados
        if(!user) { return done(null, false, {message: 'Utilizador inexistente!\n'})}
        if(password != user.password) { return done(null, false, {message: 'Credenciais inválidas!\n'})}
        return done(null, user)
      })
      .catch(erro => done(erro))
    })
)

// Indica-se ao passport como serializar o utilizador
passport.serializeUser((user,done) => {
  console.log('Serielização, username: ' + user.username)
  done(null, user.username)
})
  
// Desserialização: a partir do id obtem-se a informação do utilizador
passport.deserializeUser((uname, done) => {
  console.log('Desserielização, username: ' + uname)
  User.consultar(uname)
    .then(dados => done(null, dados))
    .catch(erro => done(erro, false))
})

var usersRouter = require('./routes/user');

var app = express();

app.use(session({
  genid: req => {
    return uuidv4()
  },
  store: new FileStore({retries: 2}),
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

app.use(function(req, res, next){
  console.log('Signed Cookies: ', JSON.stringify(req.signedCookies))
  console.log('Session: ', JSON.stringify(req.session))
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

  // render the error page (not really, porque o auth-server não tem views, logo aqui não dá render de nenhuma página)
  res.status(err.status || 500).jsonp({error: err.message})
});

module.exports = app;
