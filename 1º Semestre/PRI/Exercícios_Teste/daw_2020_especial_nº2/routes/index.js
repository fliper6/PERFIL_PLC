var express = require('express');
var router = express.Router();
var axios = require('axios')

var token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODFlYjA3NmYwN2ZjMzRhMTY3NGQ1YSIsImxldmVsIjo3LCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJqY3JAZGkudW1pbmhvLnB0IiwiaWF0IjoxNjEwOTA5NTAzLCJleHAiOjE2MTA5MzgzMDN9.QDCVDhmuaG6AVj5G-GgT-0ifn9scWOgmi6QKCL7_EUUr_-Y9FGntDYIefkc7OL220xdq41MLFeLQqNf2B0eFb21gSnn5ehSfz7chrr7PrC3m73_MJk005xhD8mbidjltAiFN5tjCcEhdKcxQDfnoWM-4yrPMoK61hktGtUk9-1gcHviGP1R-pECE6D_x0err0SG8gjYq25F_7ptgxqbLd-rK8qz5kopBUgC6dVwXSNlyYaXr7YkQVjM2-XMmb1PA0SjibW6xiP-GXQwfdatItNdD5RiNMfc1aoIFDAau5m-MvOZu9Wvxi4T3A3ATDJPSRI6vrjGpH_dVD4G-pQdG2A'

/*
GET http://clav-api.dglab.gov.pt/api/tipologias/{id} - Devolve a informação de uma tipologia com identificador igual a id;
GET http://clav-api.dglab.gov.pt/api/tipologias/{id}/elementos - Devolve a lista de entidades pertencentes à tipologia;
GET http://clav-api.dglab.gov.pt/api/tipologias/{id}/intervencao/dono - Devolve a lista de processos de que a tipologia é dona;
GET http://clav-api.dglab.gov.pt/api/entidades/{id} - Devolve toda a informação de uma entidade;
GET http://clav-api.dglab.gov.pt/api/entidades/{id}/tipologias - Devolve as tipologias a que uma entidade pertence.
*/

// (1) GET http://clav-api.dglab.gov.pt/api/tipologias - Devolve a lista de tipologias com várias opções de configuração;
router.get('/tipologias', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/tipologias?token=' + token)
    .then(dados => {
      console.log(dados.data.length)
      res.render('index', {tips: dados.data})
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});

router.get('/tipologias/:id', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/tipologias/' + req.params.id +'?token=' + token)
    .then(tip => {
      axios.get('http://clav-api.di.uminho.pt/v2/tipologias/' + req.params.id +'/elementos?token=' + token)
      .then(ents => {
        axios.get('http://clav-api.di.uminho.pt/v2/tipologias/' + req.params.id +'/intervencao/dono?token=' + token)
        .then(dados => {
          res.render('tipologia', {t: tip.data, ents: ents.data, pros: dados.data})
        })
        .catch(err => {
          res.status(500).jsonp({erro:err})
        })
      })
      .catch(err => {
        res.status(500).jsonp({erro:err})
      })
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});

router.get('/tipologias/:id/elementos', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/tipologias/' + req.params.id +'/elementos?token=' + token)
    .then(dados => {
      res.status(200).jsonp({dados:dados.data})
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});

router.get('/entidades', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/entidades?token=' + token)
    .then(dados => {
      res.status(200).jsonp({dados:dados.data})
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});

router.get('/tipologias/:id/intervencao/dono', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/tipologias/' + req.params.id +'/intervencao/dono?token=' + token)
    .then(dados => {
      res.status(200).jsonp({dados:dados.data})
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});


router.get('/entidades/:id', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/entidades/' + req.params.id +'?token=' + token)
    .then(dados => {
      res.render('entidade', {e: dados.data})
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});

router.get('/entidades/:id/tipologias', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/entidades/' + req.params.id +'/tipologias?token=' + token)
    .then(dados => {
      res.status(200).jsonp({dados:dados.data})
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});

module.exports = router;
