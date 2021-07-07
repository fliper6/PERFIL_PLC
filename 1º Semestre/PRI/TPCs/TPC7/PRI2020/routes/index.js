var express = require('express');
var router = express.Router();

const Aluno = require('../controllers/aluno')

/*-----------------------GETS-----------------------*/

//GET/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Turma PRI de 2020', warning: '' });
});


// GET/alunos
router.get('/alunos', (req,res) => {  
  Aluno.listar()
    .then(dados => res.render('alunos', {lista: dados}))
    .catch(e => res.render('error', {error: e}))
})

//GET/alunos/registar
router.get('/alunos/registar', (req,res) => { 
  res.render('registar')
})

//GET/alunos/:id/editar 
router.get('/alunos/:id/editar', (req,res) => { 
  var id = req.params.id
  Aluno.consultar(id)
    .then(dados => res.render('editar', {al: dados}))
    .catch(e => res.render('error', {error: e}))
})

//GET/alunos/:id
router.get('/alunos/:id', (req,res) => { 
  var id = req.params.id
  Aluno.consultar(id)
    .then(dados => res.render('aluno', {al: dados}))
    .catch(e => res.render('error', {error: e}))
})

/*-----------------POST / PUT / DELETE-------------------*/

//POST/alunos 
router.post('/alunos', function(req,res) {
  let alunoNovo = {}
    alunoNovo["Número"] = req.body["Número"]
    alunoNovo["Nome"] = req.body["Nome"]
    alunoNovo["Git"] = req.body["Git"]
    let tpc = [], tpcNr = 0
    while (tpcNr < 7) {
      if (req.body[`tpc${tpcNr + 1}`]=="on") tpc[tpcNr]=1
      else tpc[tpcNr]=0
      tpcNr++
    }
    alunoNovo["tpc"] = tpc
  Aluno.inserir(alunoNovo)
    .then(res.render('index', { title: 'Turma PRI de 2020', warning: '** Aluno ' + req.body["Número"] + ' inserido! **'} ))
    .catch(e => res.render('error', {error: e}))
})

/*PUT/alunos/:id 
router.put('/alunos/:id', function(req,res) {
  let alunoNovo = {}
    alunoNovo["Número"] = req.body["Número"]
    alunoNovo["Nome"] = req.body["Nome"]
    alunoNovo["Git"] = req.body["Git"]
    let tpc = [], tpcNr = 0
    while (tpcNr < 7) {
      if (req.body[`tpc${tpcNr + 1}`]=="on") tpc[tpcNr]=1
      else tpc[tpcNr]=0
      tpcNr++
    }
    alunoNovo["tpc"] = tpc
  Aluno.inserir(alunoNovo)
    .then(res.render('index', { title: 'Turma PRI de 2020', warning: '** Aluno ' + req.body["Número"] + ' alterado! **'} ))
    .catch(e => res.render('error', {error: e}))
})*/

//DELETE/alunos/:id
router.delete('/alunos/:id', function(req,res) {
  console.log("1")
  var id = req.params.id
  Aluno.apagar(id)
    .then(res.render('index', { title: 'Turma PRI de 2020', warning: '** Aluno ' + req.body["Número"] + ' apagado! **'} ))
    .catch(e => res.render('error', {error: e}))
})

module.exports = router;
