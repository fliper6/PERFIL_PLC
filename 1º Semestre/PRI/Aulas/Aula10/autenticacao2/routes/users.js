var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../controllers/user')

/* GET users listing. */
router.get('/login', function(req, res) {
  console.log('CB DA LOGIN')
  res.render('login');
});

router.get('/logout', function(req,res) {
  req.logout();
  req.session.destroy(function (err) {
    if (!err) {
        res.redirect('/');
    } else {
        console.log('Destroy session error: ', err)
    }
  });
})

router.get('/register', function (req, res) {
  console.log('CB DA HOMEPAGE: ' + req.sessionID)
  res.render('reg-form');
});

router.get('/:id', function(req,res) {
  User.lookUp(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(err => res.status(500).jsonp(err))
})

router.post('/login', passport.authenticate('local'), function (req, res) {
  console.log('CB DA POST LOGIN')
  console.log('Auth: ' + JSON.stringify(req.user))
  console.log(req.body)
  res.redirect('/protegida')
})

router.post('/register', function (req, res) {
  User.insert(req.body)
    .then(dados => res.redirect('/'))
    .catch(error => res.render('error', {error: error}))
})

module.exports = router;
