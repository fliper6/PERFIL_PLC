var express = require('express');
var router = express.Router();
var axios = require('axios');

/*Home Page*/
router.get('/', function(req, res, next) {  
  var prefixes = `PREFIX ut: <http://www.semanticweb.org/filipa/ontologies/2021/5/ontologia#>`
  var getLink = "http://localhost:7200/repositories/SPLN-TP" + "?query=" 

  var query = `select * where {?s rdf:type ut:Utilizador} order by asc (?s)`
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)

    .then(dados => { 
      var listUt = dados.data.results.bindings
      res.render('index', {uts:listUt})
    })
    .catch(e => res.render('error', {error: e}))
});

/*Página de um Utilizador*/
router.get('/utilizadores/:id', function(req, res, next) {  
  var prefixes = `PREFIX ut: <http://www.semanticweb.org/filipa/ontologies/2021/5/ontologia#>`
  var getLink = "http://localhost:7200/repositories/SPLN-TP" + "?query=" 

  var query = `select * where {ut:${req.params.id} ?p ?o FILTER (?p != ut:criou)} order by asc (?p)`
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)
    .then(dados => {

      var list1 = dados.data.results.bindings

      var query = `select * where {ut:${req.params.id} ut:criou ?o} order by asc (?p)`
      var encoded = encodeURIComponent(prefixes + query)
      axios.get(getLink + encoded)
      .then(dados => {

        var list2 = dados.data.results.bindings
        res.render('utilizador', {lista1: list1, lista2: list2, nome: req.params.id})
      })    
      .catch(e => res.render('error', {error: e}))  

    })    
    .catch(e => res.render('error', {error: e}))  
})

module.exports = router;