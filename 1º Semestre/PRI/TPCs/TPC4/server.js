var http = require('http')
var url = require('url')
var fs = require('fs')

// Formato baseado no exercício feito na aula 
var servidor = http.createServer(function (req,res) {
    // http://localhost:7777/arqs/1
    if(req.url.match(/\/arqs\/([1-9]|[1-9][0-9]|[1]([0-1][0-9]|[2][0-2]))$/)) { // Formato pretendido (1 até 122)
        var pos = req.url.split("/")[2] // Fica com o 3º elemento, i.e., a posição do arqueossítio
        fs.readFile('site/' + pos+ '.html', function(err,data) {
            if(err){
                console.log('ERRO na leitura do ficheiro: ' + err)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("<p>Arqueossítio inexistente.</p>")
            } else{
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data)  
            }
            res.end()
        })
    }
    // http://localhost:7777/arqs/arq or http://localhost:7777/arqs/*
    else if(req.url.match(/\/arqs\/arq$/) || req.url.match(/\/arqs\/\*$/)) { 
        fs.readFile('site/arq.html', function(err,data) {
            if(err){
                console.log('ERRO na leitura do ficheiro: ' + err)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("<p>Ficheiro inexistente.</p>")
                
            } else{
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data)
            }
            res.end()
        })
    }
    else {
        // Favicon errors
        console.log('ERRO: foi pedido um ficheiro não esperado')
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write("<p>Ficheiro inexistente.</p>")
        res.end()
    }
})

servidor.listen(7777)
console.log('Servidor à escuta na porta 7777....')
