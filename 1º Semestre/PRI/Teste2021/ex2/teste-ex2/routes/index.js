var express = require('express');
var router = express.Router();
var axios = require('axios')

// (1)
var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4NzMxNiwiZXhwIjoxNjExMDE2MTE2fQ.NB4UqTAeYvdYq0xHbwPHIArMeLYkAqqITPmitqOn6_BkAkFnGGv6ckU2akcs0M4e62SF9Hto2HN7KmHgc0Xh151bLpgadefNG8_mP1rXQwXe4MOgMGE7MRXpANc5yFjTOcu70MB0CCK7DA1AFKQnWAhrp7UmiGzyqNGss4gMt1YOMhilW1wJliXPMdAOz2LH-6jlkmiVzXuFNIhf_o5wb1Qx7bYqan50WlAGBnYVKUg2eWMVGAE2OLERwcBx_w7o5LhicS-GniXsbDjo9a-QG7L1_rbJxV0esfjzBtoubGBe12tkk0PB-vQzHgYfYNIYOQpbdFIwpIFEO5wHzymRIA"


// (2) Página Inicial: título + outra informação de contexto + lista de classes de nível 1 (código e título)
router.get('/', function(req, res) {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
    .then(dados => {
      res.render('index', {classes1: dados.data})
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});

// (3) Os campos de informação com códigos de classes devem ser transformados em links que realizam pedidos à tua aplicação de nova página
router.get('/:id', function(req, res) {            
  console.log(req.params.id)
  axios.get('http://clav-api.di.uminho.pt/v2/classes/' + "c" + req.params.id + '?token=' + token)
    .then(dados => {
      // (4)  Lista dos descendentes 
      axios.get('http://clav-api.di.uminho.pt/v2/classes/' + "c" + req.params.id + '/descendencia?token=' + token)
      .then(dados2 => {
       res.render('class', {c: dados.data, f: dados2.data})
      })
      .catch(err => {
        res.status(500).jsonp({erro:err})
      })
    })
    .catch(err => {
      res.status(500).jsonp({erro:err})
    })
});

module.exports = router;

