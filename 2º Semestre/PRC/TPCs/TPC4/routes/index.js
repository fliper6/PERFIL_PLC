var express = require('express');
var router = express.Router();
var axios = require('axios');

/*Home Page*/
router.get('/', function(req, res, next) {  
  var prefixes = `PREFIX tb: <http://www.daml.org/2003/01/periodictable/PeriodicTable#>`
  var getLink = "http://localhost:7200/repositories/tabelaperiodica" + "?query=" 

  var query = `select * where {?s ?p tb:Element} order by asc (?s)`
  var encoded = encodeURIComponent(prefixes + query)
  axios.get(getLink + encoded)

    .then(dados => { 
      var listEl = dados.data.results.bindings

      var query = `select * where {?s ?p tb:Group} order by asc (?s)`
      var encoded = encodeURIComponent(prefixes + query)
      axios.get(getLink + encoded)

        .then(dados => {    
          var listGr = dados.data.results.bindings

          var query = `select * where {?s ?p tb:Period} order by asc (?s)`
          var encoded = encodeURIComponent(prefixes + query)
          axios.get(getLink + encoded)

            .then(dados => {    
              var listPd = dados.data.results.bindings   
              res.render('index', {el:listEl, gr:listGr, pd:listPd})
            })
            .catch(e => res.render('error', {error: e}))
        })
        .catch(e => res.render('error', {error: e}))
    })
    .catch(e => res.render('error', {error: e}))
});

/*Página de um Elemento*/
router.get('/el/:id', function(req, res, next) {  
  var prefixes = `PREFIX tb: <http://www.daml.org/2003/01/periodictable/PeriodicTable#>`
  var getLink = "http://localhost:7200/repositories/tabelaperiodica" + "?query=" 

  var query = `select * where {tb:${req.params.id} ?p ?o}`
  console.log(query)
  var encoded = encodeURIComponent(prefixes + query)

  axios.get(getLink + encoded)
    .then(dados => {
      res.render('elemento', {elem: dados.data.results.bindings, nome: req.params.id})
    })    
    .catch(e => res.render('error', {error: e}))  
})

module.exports = router;