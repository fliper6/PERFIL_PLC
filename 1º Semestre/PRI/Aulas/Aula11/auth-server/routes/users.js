var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var fs = require('fs')

var user = {
  username: 'jcr',
  password: 123,
  level: 'admin'
}


var user2 = {
  username: 'pdp',
  password: 123,
  level: 'consumer'
}

/*
o utilizador autentica-se com username e passwd
Se as credenciais estivererm corretas um token gerado e enviado como resposta
*/

/* GET users listing. */
router.post('/', function(req, res) {
  console.log(req.body.username + " " + req.body.password)
  console.log(user.username + ' ' + user.password)

  if((req.body.username == user.username) && (req.body.password == user.password)) {
    console.log("ola")
    var privateKey = fs.readFileSync(__dirname.split('routes')[0] + "keys/mykey.pem");
    jwt.sign({username: user.username, level:user.level, expiresIn:'1d'}, privateKey, { algorithm: 'RS256'}, function(err, token) {
        if(err) res.status(500).jsonp({error: "Erro na geração do token: " + err})
        else res.status(201).jsonp({token: token})
    });
  }
  else {
    res.status(401).jsonp({error: "Credenciais Inválidas"})
  }
});

module.exports = router;
