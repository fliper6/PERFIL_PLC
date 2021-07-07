var express = require('express');
var router = express.Router();
var axios = require('axios');

/*Home Page*/
router.get('/', function(req, res, next) {  
  axios.get("http://localhost:7200/rest/repositories")
    .then(dados => {    
      res.render('index', {listRep: dados.data})  
    })
    .catch(e => res.render('error', {error: e}))
})

/*Página de um Repositório*/
router.get('/:id', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" 
  var query = `select * where {?s rdf:type owl:Class}`
  var encoded = encodeURIComponent(query)

  axios.get(getLink + encoded)
    .then(dados => {
      res.render('rep', {id: req.params.id, rep: dados.data.results.bindings})
    })    
    .catch(e => res.render('error', {error: e}))  
})

/*Página de uma Classe*/
router.get('/:id/:classe', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" 
  var query = `select * where {?s rdf:type owl:Class}`
  var encoded = encodeURIComponent(query)

  axios.get(getLink + encoded)
    .then(dados => {
      dados.data.results.bindings.forEach( c => {

        if (req.params.classe == c.s.value.split("#")[1]) {
          query = `select * where {?s rdf:type <${c.s.value}>}`
          console.log(c.s.value)
          encoded = encodeURIComponent(query)

          axios.get(getLink + encoded)
            .then(dados => {
              dados.data.results.bindings.forEach(c => {
                res.render('classe', {id: req.params.id, classe: req.params.classe, indivs: dados.data.results.bindings})
              })
            })
            .catch(e => res.render('error', {error: e})) 
        }
      })     
    })    
    .catch(e => res.render('error', {error: e}))  
})

/*Página de um Indivíduo*/
router.get('/:id/:classe/:individuo', function(req, res, next) {  
  var getLink = "http://localhost:7200/repositories/" + req.params.id + "?query=" 
  var query = `select * where {?s rdf:type owl:Class}`
  var encoded = encodeURIComponent(query)

  axios.get(getLink + encoded)
    .then(dados => {
      dados.data.results.bindings.forEach( i => {

        if (req.params.classe == i.s.value.split("#")[1]) {
          query = `select * where {?s rdf:type <${i.s.value}>}`
          encoded = encodeURIComponent(query)

          axios.get(getLink + encoded)
            .then(dados => {
              dados.data.results.bindings.forEach(d => {

                if (req.params.individuo == d.s.value.split("#")[1]) {
                  query = `select * where {<${d.s.value}> ?p ?o}`
                  encoded = encodeURIComponent(query)

                  axios.get(getLink + encoded)
                    .then(dados => {
                      res.render('indiv', {indiv: req.params.individuo, dados: dados.data.results.bindings})
                    })
                    .catch(e => res.render('error', {error: e}))  
                }
              })
            })
            .catch(e => res.render('error', {error: e})) 
        }
      })     
    })    
    .catch(e => res.render('error', {error: e}))  
})

module.exports = router;