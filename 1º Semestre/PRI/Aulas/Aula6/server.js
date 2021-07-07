var http = require('http')
var axios = require('axios')
var fs = require('fs')


// Funções auxilidares
// Template para a página com a lista de alunos ------------------
function geraPagAlunos( alunos, d){
  let pagHTML = `
    <html>
        <head>
            <title>Lista de alunos</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>Lista de Alunos</h2>
            </div>
            <table class="w3-table w3-bordered">
                <tr>
                    <th>Nome</th>
                    <th>Número</th>
                    <th>Curso</th>
                </tr>
  `
alunos.forEach(a => {
    pagHTML += `
        <tr>
            <td> <a href="/alunos/${a.id}">${a.nome}</a> </td>
            <td> ${a.id} </td>
            <td> ${a.curso} </td>
        </tr>
  `
});

  pagHTML += `
        </table>
        <div class="w3-container w3-teal">
            <address>Gerado por galuno::PRI2020 em ${d} --------------</address>
        </div>
    </body>
    </html>
  `
  return pagHTML
}

// Template para a página de aluno -------------------------------------
function geraPagAluno( aluno, d ){
    return `
    <html>
    <head>
        <title>Aluno: ${aluno.id}</title>
        <meta charset="utf-8"/>
        <link rel="stylesheet" href="../w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.id}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${aluno.nome}</li>
                    <li><b>Número: </b> ${aluno.id}</li>
                    <li><b>Curso: </b> ${aluno.curso}</li>
                    <li><b>Git (link): </b> <a href="${aluno.git}">${aluno.git}</a></li>
                </ul>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}

// Template para o formulário de aluno ------------------
function geraFormAluno( d ){
    return `
    <html>
        <head>
            <title>Registo de um aluno</title>
            <meta charset="utf-8"/>
            <link rel="stylesheet" href="../w3.css"/>
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>Registo de Aluno</h2>
            </div>

            <form class="w3-container" action="/alunos" method="POST">
                <label class="w3-text-teal"><b>Nome</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="nome">
          
                <label class="w3-text-teal"><b>Número / Identificador</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="id">

                <label class="w3-text-teal"><b>Curso</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="curso">

                <label class="w3-text-teal"><b>Link para o repositório no Git</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="git">
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}

// Criação do servidor

var galunoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    switch(req.method){
        case "GET": 
            // GET /alunos --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/alunos")){
                axios.get("http://localhost:3000/alunos?_sort=nome")
                    .then(response => {
                        var alunos = response.data
 
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagAlunos(alunos,d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter a lista de alunos...")
                        res.end()
                    })
            }
            // GET /alunos/:id --------------------------------------------------------------------
            else if(/\/alunos\/(A|PG)[0-9]+$/.test(req.url)){
                var idAluno = req.url.split("/")[2]
                axios.get("http://localhost:3000/alunos/" + idAluno)
                    .then( response => {
                        let a = response.data
                        
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagAluno(a,d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter o registo de aluno...")
                        res.end()
                    })
            }
            // GET /alunos/registo --------------------------------------------------------------------
            else if(req.url == "/alunos/registo"){
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write(geraFormAluno(d))
                res.end()
            }
            // GET /w3.css ------------------------------------------------------------------------
            else if(req.url == "/w3.css"){
                fs.readFile("w3.css", function(erro, dados){
                    if(!erro){
                        res.writeHead(200, {'Content-Type': 'text/css;charset=utf-8'})
                        res.write(dados)
                        res.end()
                    }
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
            if(req.url == '/alunos') {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<p>Recebi um POST dum aluno</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()    
            } else {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
})

galunoServer.listen(7777)
console.log('Servidor à escuta na porta 7777...')