var express = require('express');
var router = express.Router();

var Casamento = require('../controllers/casamento')

// (2) GET /api/casamentos/:id - Devolve a informação completa de um casamento (nesta rota, considere para id o campo ref);
router.get('/api/casamentos/:id', function(req,res) {
  Casamento.alinea2(req.params.id)
    .then(data => res.status(200).jsonp({cas: data}))
    .catch(err => res.status(500).jsonp({erro: err}))
})

router.get('/api/casamentos', function(req, res) {
  // (3) GET /api/casamentos?nome=X - Devolve apenas uma lista com os casamentos onde o nome X aparece incluído no título;
  if(req.query.nome != null) {
    Casamento.alinea3(req.query.nome) 
      .then(data => res.status(200).jsonp({cas: data}))
      .catch(err => res.status(500).jsonp({erro: err}))
  }
  // (4) GET /api/casamentos?ano=YYYY - Devolve a lista de casamentos realizados no ano YYYY;
  else if(req.query.ano != null) { 
    Casamento.alinea4(req.query.ano)
      .then(data => res.status(200).jsonp({cas: data}))
      .catch(err => res.status(500).jsonp({erros: err}))
  }
  // (5) GET /api/casamentos?byAno=true - Devolve a lista de casamentos agrupadas por ano, ou seja, devolve uma lista de anos em que a cada ano está associada uma lista de casamentos (coloque apenas a ref e o title do casamento);
  /*else if(req.query.autor != null) { 
    Casamento.alinea5(req.query.byAno)
      .then(data => res.status(200).jsonp({cas: data}))
      .catch(err => res.status(500).jsonp({erro: err}))
  }*/

  // (1) GET /api/pubs - Devolve a lista de publicações apenas com os campos "id", "title", "year" e "type" 
  else Casamento.alinea1()
  .then(data => res.status(200).jsonp({cas: data}))
  .catch(err => res.status(500).jsonp({erro: err}))
});

// (6) GET /api/casamentos/noivos - Devolve uma lista de nomes dos noivos, ordenada alfabeticamente, e o id do respetivo registo.
router.get('/api/casamentos/noivos', function(req,res) {
  Casamento.alinea6()
    .then(data => {
      var noivos = [] // Junta todos os noivos nesta variável
      data.forEach(i => {
        i.noivos.forEach(noivo => {
          if(!noivos.includes()) noivos.push(noivo)
        })
      })
      res.status(200).jsonp({cas: noivos.sort()}) // Ordenar alfabeticamente
    })
    .catch(err => res.status(500).jsonp({erro: err}))
})


module.exports = router;