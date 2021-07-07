var jwt = require('jsonwebtoken');
var token = jwt.sign({username: 'pdp', level:'admin', expiresIn:'1d'}, 'PRI2020');

try{
    var token = jwt.sign({username: 'pdp', level:'admin', expiresIn:'1d'}, 'PRI2020');
    console.log(token)
}
catch(err){
    console.log('Erro na criaçao do token: ' + err)
}

var decoded = jwt.verify(token, 'PRI2020');
console.log(JSON.stringify(decoded))

try{
    
    var decoded = jwt.verify(token, 'segredo errado');
    console.log(JSON.stringify(decoded))

}
catch(err){
    console.log('Erro: ' + err)
}