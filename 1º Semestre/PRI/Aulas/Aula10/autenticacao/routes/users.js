var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET users listing. */
router.get('/login', function(req, res) {
  console.log('CB DA LOGIN')
  res.render('login');
});

router.get('/logout', function(req,res) {
  req.logout();
  res.redirect('/')
})

router.get('/register', function (req, res) {
  console.log('CB DA HOMEPAGE: ' + req.sessionID)
  res.render('reg-form');
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  console.log('CB DA POST LOGIN')
  console.log('Auth: ' + JSON.stringify(req.user))
  console.log(req.body)
  res.redirect('/protegida')
})

router.post('/register', function (req, res) {
  console.log('CB DA POST REGISTER')
  console.log(req.body)
  res.send('Registo recebido e tratado...')
})

module.exports = router;
