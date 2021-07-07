var http = require('http')

const axios  = require('axios')

var servidor = http.createServer(function (req,res) {
    if(req.method == 'GET') { 
        if (req.url == '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
        res.write('<h2>Escola de musica</h2>')
        res.write('<ul>')
        res.write('<li> <a href=\"http://localhost:3001/alunos\">Lista de alunos</a> </li>')
        res.write('</ul>')
        res.end()
        }
        else if(req.url == '/alunos') {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/alunos')
            .then(resp => {
                alunos= resp.data;
                res.write('<ul>');
                alunos.forEach(a => {
                    res.write(`<li>${a.id}, ${a.instrumento}</li>`)
                });
                res.write('</ul>');
                res.end()
            })
            .catch(error => {
                console.log('ERRO: ' + error);
                res.write('<p>Não obtive alunos...</p>')
            });

        }
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<p>Pedido nao suportado: ' + res.method + '</p>')
        res.end()
        }
})


servidor.listen(3001)
console.log('Servidor à escuta na porta 3001....')