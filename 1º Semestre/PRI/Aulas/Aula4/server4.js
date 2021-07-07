var http = require('http')
var fs = require('fs')
var url = require('url')

var servidor = http.createServer(function (req,res) {
    if(req.url.match(/\/[1-9]$/)) { /*expressão regular para verificar se está no formato pretendido */
        var num = req.url.split("/")[1]  /*para apanhar o nº do ex.html que queremos, que corresponde ao 2º elemento*/
        fs.readFile('ex' + num + '.html', function(err,data) {
            if(err){
                console.log('ERRO na leitura do ficheiro: ' + err)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("<p>Ficheiro inexistente.</p>")
                res.end()
            } 
            else{
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data)
                res.end()
            }
    
        })
    }
    else {
        /*Erros que estão a dar é por causa do favicon, não pelos ficheiros*/
        console.log('ERRO: foi pedido um ficheiro não esperado')
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write("<p>Ficheiro inexistente.</p>")
        res.end()
    }
})

servidor.listen(7777)
console.log('Servidor à escuta na porta 7777....')

