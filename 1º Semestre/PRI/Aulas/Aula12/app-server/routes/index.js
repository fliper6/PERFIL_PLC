var express = require('express');
var router = express.Router();
var axios = require('axios')

// Método para guardarmos os tokens (isto só dá para 1 utilizador pois com vários utilizadores em simultâneo, os tokens iam dar overwrite)
// Logo, uma alternativa seria guardar o token nas cookies (vou pôr este método em comentário nos post do login e no get das tarefas)
if(typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./localState');
}

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/login', function(req,res) {
  res.render('login')
})

router.post('/login', function(req,res) {
  axios.post('http://localhost:8002/users/login', req.body)
    .then(dados => {
      // Token guardado
      localStorage.setItem('myToken', dados.data.token);
      /*res.cookie('token', dados.data.token, {
        expires: new Date(Date.now() + '1d'),
        secure: false, // set to true if your using https
        httpOnly: true
      });*/
      res.redirect('/tarefas')
    })
    .catch(erro => res.render(error, {error: erro}))
})

router.get('/tarefas', function(req,res) {
  // Vamos autorizar o acesso às tarefas caso o token seja igual ao guardo no login
  /*console.log(JSON.stringify(req.cookies))
    axios.get('http://localhost:8001/tarefas?token=' + req.cookies.token) */
  var t = localStorage.getItem('myToken')
  axios.get('http://localhost:8001/tarefas?token=' + t)
    .then(dados => res.render('tarefas', {tarefas: dados.data}))
    .catch(e => res.render('error', {error: e}))
})

router.get('/remover/:id', function(req,res) {
  var t = localStorage.getItem('myToken')
  axios.delete('http://localhost:8001/tarefas/' + req.params.id + '?token=' + t)
    .then(dados => res.redirect('/tarefas'))
    .catch(e => res.render('error', {error: e}))
})

module.exports = router;
