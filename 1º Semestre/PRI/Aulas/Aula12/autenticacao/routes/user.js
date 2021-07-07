var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var User = require('../controllers/user')

var passport = require('passport')

router.get('/logout', function(req, res){
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
        res.redirect('/');
    } else {
        console.log('Destroy session error: ', err)
    }
  });
});

router.get('/', function(req,res) {
  User.listar()
    .then(dados => res.status(200).jsonp({users: dados})) //200 = get
    .catch(err => res.status(500).jsonp({err: err}))
})

router.post('/', function(req,res) {
  User.inserir(req.body)
    .then(dados => res.status(201).jsonp({user: dados})) //201 = post
    .catch(err => res.status(500).jsonp({err: err}))
})
  
router.post('/login', passport.authenticate('local'), function(req, res){
  jwt.sign({username: req.user.username, level:req.user.level, sub:'Aula de PRI'},'PRI2020', /*{expiresIn: 30},*/
    function(err, token) {
      if(err) res.status(500).jsonp({error: "Erro na geração do token: " + err})
      else res.status(201).jsonp({token: token})
  });
})

module.exports = router;