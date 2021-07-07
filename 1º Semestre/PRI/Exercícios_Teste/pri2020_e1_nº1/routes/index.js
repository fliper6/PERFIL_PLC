var express = require('express');
var router = express.Router();

var Pub = require('../controllers/pub')


router.get('/api/pubs', function(req, res) {
  // GET /api/pubs?type=YYY&year=AAAA - Devolve a lista de publicações que tenham o campo "type" com o valor "YYY" e o campo "year" com um valor superior a "AAAA"
  if(req.query.type != null && req.query.year != null) {
    Pub.listQueryTypeYear(req.query.type, req.query.year) 
      .then(data => res.status(200).jsonp({pubs: data}))
      .catch(err => res.status(500).jsonp({erro: err}))
  }
  // GET /api/pubs?type=YYY - Devolve a lista de publicações que tenham o campo "type" com o valor "YYY"
  else if(req.query.type != null && req.query.year == null) { 
    Pub.listQueryType(req.query.type)
      .then(data => res.status(200).jsonp({pubs: data}))
      .catch(err => res.status(500).jsonp({erro: err}))
  }
  // GET /api/pubs?autor=AAA - Devolve uma lista com as publicações do autor
  else if(req.query.autor != null) { 
    Pub.listQueryAutor(req.query.autor)
      .then(data => res.status(200).jsonp({pubs: data}))
      .catch(err => res.status(500).jsonp({erro: err}))
  }
  // GET /api/pubs - Devolve a lista de publicações apenas com os campos "id", "title", "year" e "type" 
  else Pub.list()
    .then(data => res.status(200).jsonp({pubs: data}))
    .catch(err => res.status(500).jsonp({erro: err}))
});

// GET /api/pubs/:id - Devolve a informação completa de uma publicação
router.get('/api/pubs/:id', function(req,res) {
  Pub.lookUp(req.params.id)
    .then(data => res.status(200).jsonp({pubs: data}))
    .catch(err => res.status(500).jsonp({erro: err}))
})

// GET /api/types - Devolve a lista de tipos, sem repetições
router.get('/api/types', function(req,res) {
  Pub.listType()
    .then(data => res.status(200).jsonp({pubs: data}))
    .catch(err => res.status(500).jsonp({erro: err}))
})

// GET /api/autores - Devolve uma lista ordenada alfabeticamente com os nome dos autores
router.get('/api/autores', function(req,res) {
  Pub.listAutores()
    .then(data => {
      var autores = [] // Junta todos os autores nesta variável
      data.forEach(i => {
        i.authors.forEach(autor => {
          if(!autores.includes(autor)) autores.push(autor)
        })
      })
      res.status(200).jsonp({autores: autores.sort()}) 
    })
    .catch(err => res.status(500).jsonp({erro: err}))
})

module.exports = router;
