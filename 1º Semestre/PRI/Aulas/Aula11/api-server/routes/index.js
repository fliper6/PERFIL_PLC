const { json } = require('express');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).jsonp({dados: "Lista de qq coisa"})
});

router.get('/secreta', function(req,res) {
  if (verificaAdmin('admin', req.user.level)) res.status(200).jsonp({dados: "LISTA SECRETA"})
  else res.status(401).jsonp({erro: 'Nao tem autorização'})
})

function verificaAdmin(admin, level) {
  return (admin == level)
}

module.exports = router;
