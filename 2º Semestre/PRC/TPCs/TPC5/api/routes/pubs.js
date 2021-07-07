var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefixes = `
PREFIX : <http://www.semanticweb.org/filipa/ontologies/2021/3/jcrpubs#> 
PREFIX owl: <http://www.w3.org/2002/07/owl#> 
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
PREFIX xml: <http://www.w3.org/XML/1998/namespace> 
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> 
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
` 

var link = "http://epl.di.uminho.pt:8738/api/rdf4j/query/A83631-TP5?query=" 
var link2 = "http://epl.di.uminho.pt:8738/api/rdf4j/update/A83631-TP5?query=" 

// ############### GET /pubs
router.get('/pubs', function(req, res, next) {
  query = `SELECT * where { ?p rdf:type :Publication }`
  var encoded = encodeURIComponent(prefixes + query)

  axios.get(link + encoded)  
    .then(dados => res.send(dados.data))
    .catch(err => { res.status(500).jsonp(err); })
})


// ############### GET /pubs/{id}
router.get('/pubs/:id', function(req, res, next) {
  var query = `select * where {:${req.params.id} ?p ?o}`
  var encoded = encodeURIComponent(prefixes + query)

  axios.get(link + encoded)  
    .then(dados => res.send(dados.data))
    .catch(err => { res.status(500).jsonp(err); })
})


// ############### POST /pubs
router.post('/pubs', function(req, res){
  var query = `INSERT DATA { ${req.body} }` 
  var encoded = encodeURIComponent(prefixes + query)
  
  axios.post(link2 +  encoded)
    .then(dados => res.send(dados.data))
    .catch(err => { res.status(500).jsonp(err); })
})


// ############### DELETE /pubs/{id}
router.delete('/pubs/:id', function(req, res){
  var query = `DELETE DATA { :${req.params.id} :Publication}`
  var encoded = encodeURIComponent(prefixes + query);

  axios.post(link2 +  encoded)
    .then(dados => res.send(dados.data))
    .catch(err => { res.status(500).jsonp(err); })
})


// ############### PUT /pubs/{id}
router.put('/pubs/:id', function(req, res){
  var query = `DELETE DATA { :${req.params.id} :Publication }`
  var encoded = encodeURIComponent(prefixes + query);

  axios.post(link2 +  encoded)
    .then(() => {
      var query = `INSERT DATA { ${req.body} }` 
      var encoded = encodeURIComponent(prefixes + query)

      axios.post(link2 +  encoded)
        .then(dados => res.send(dados.data))
        .catch(err => { res.status(500).jsonp(err);})
    })
    .catch(err => { res.status(500).jsonp(err); })
})

module.exports = router;