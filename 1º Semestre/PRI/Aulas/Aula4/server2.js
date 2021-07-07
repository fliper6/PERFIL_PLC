var http = require('http')

var servidor = http.createServer(function (req,res) {
    console.log(req.method + " " + req.url)
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(req.url)
    res.end()
})

servidor.listen(7777)
console.log('Servidor à escuta na porta 7777....')
