var express = require('express');
var router = express.Router();

var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/protegida', verificaAutenticacao, function (req,res) {
    res.render('protegida', {utilizador: req.user.id})
})

function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
  //req.isAuthenticated() will return true if user is logged in
    next();
  } else{
  res.redirect("/users/login");}
}
  
module.exports = router;
