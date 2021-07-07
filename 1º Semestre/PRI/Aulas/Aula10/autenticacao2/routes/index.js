var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log('CB DA HOMEPAGE: ' + req.sessionID)
  res.render('index');
});

router.get('/protegida', verificaAutenticacao, function(req,res) {
  console.log('CB DA PROTEGIDA')
  res.render('protegida');
});

function verificaAutenticacao(req,res,next) {
  console.log('User (VERIFIC.): ' + JSON.stringify(req.user))
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.redirect("/users/login");
  }
}

module.exports = router;
