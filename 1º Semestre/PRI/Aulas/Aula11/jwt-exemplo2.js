var fs = require('fs')
var jwt = require('jsonwebtoken');
var myToken = ""

var privateKey = fs.readFileSync("mykey.pem");

jwt.sign({username: 'pdp', level:'admin', expiresIn:'1d'}, privateKey, { algorithm: 'RS256'}, function(err, token) {
    if(err) console.log('err: ' + err)
    else {
        console.log("Token: " + token + '\n\n')
        myToken = token
    }
});


fs.readFile('pubkey.pem', function(e, publicKey) {
    jwt.verify(myToken, publicKey, { algorithms: ['RS256'] }, function(e, decoded) {
        if(e) console.log('err: ' + e)
        else console.log('DATA: ' + JSON.stringify(decoded))
    });
})