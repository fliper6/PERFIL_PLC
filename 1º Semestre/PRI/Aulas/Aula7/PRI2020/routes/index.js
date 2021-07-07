var express = require('express');
var router = express.Router();

const Aluno = require('../controllers/aluno')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Turma PRI de 2020' });
});

// Ligar à database dos alunos
router.get('/alunos', (req,res) => {  
  Aluno.listar()
    .then(dados => res.render('alunos', {lista: dados}))
    .catch(e => res.render('error', {error: e}))
})

module.exports = router;
