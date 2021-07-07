var http = require('http')
var axios = require('axios')
var fs = require ('fs')
var {parse} = require('querystring')

// -------------------------- Funções Templates ---------------------------
// ------------------------------------------------------------------------

// Main template: Página geral da ToDo List

function geraToDoList(l, d){

    let pagHTML = `
      <html>
          <head>
              <title>ToDo List</title>
              <meta charset="utf-8"/>
              <link rel="stylesheet" href="w3.css"/>
          </head>
          <body>
      `
      // Secção 1
      pagHTML += `
      <div class="w3-container w3-teal">
        <h2>Registar Tarefa:</h2>
      </div>
      `
      pagHTML += geraTarefa()

      // Secção 2
      pagHTML += `
      <div class="w3-container w3-teal">
      <h2>Lista de Tarefas Atuais:</h2>
      </div>
      <table class="w3-table w3-bordered">
      <tr>
        <th>Data</th>
        <th>Responsável</th>
        <th>Descrição</th>
      </tr>
      `
      pagHTML += geraListaTarefas(l)
      pagHTML += `</table>`

      //Secção 3
      pagHTML += `
      <div class="w3-container w3-teal">
           <h2>Historico de Tarefas:</h2>
      </div>
      <table class="w3-table w3-bordered">
      <tr>
          <th>Data</th>
          <th>Responsável</th>
          <th>Descrição</th>
          <th>Estado</th>
      </tr>
      
      `
      pagHTML += geraHistoricoTarefas(l)
      pagHTML += `</table>`

      pagHTML += `
          <div class="w3-container w3-teal">
              <address>Gerado por galuno::PRI2020 em ${d} --------------</address>
          </div>
      </body> 
      </html>
    `
    return pagHTML
}

// Template 1: Secção do registo de uma tarefa
function geraTarefa(){
    return `
            <form class="w3-container" action="/registar" method="POST">

                <label><b>Descrição:</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
          
                <label><b>Responsável:</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">
                
                <label><b>Data:</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="data">

                </br>

                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>
    `
}

// Template 2: Secção da lista de tarefas atuais
function geraListaTarefas(l) {

    let pag = ``
    l.forEach( t => {
        if (t.estado=="ativo") {
            pag += `
            <tr>
                <form action="/acao" method="POST">
                    <td>${t.data}</td>
                    <td>${t.responsavel}</td>
                    <td>${t.descricao}</td>
                    <td> <button name="acao" value="finalizarT${t.id}" type="submit">Finalizar</button> </td>
                    <td> <button name="acao" value="cancelarT${t.id}" type="submit">Cancelar</button> </td>
                </form>
            </tr>
            `
            }
    })
    return pag
}

// Template 3: Secção do histórico de tarefas (finalizadas e canceladas)
function geraHistoricoTarefas(l) {

    let pag = ``
    l.forEach( t => {
        if (t.estado!="ativo") {
            pag += `
            <tr>
            <td>${t.data}</td>
            <td>${t.responsavel}</td>
            <td>${t.descricao}</td>
            <td>${t.estado}</td>
            </tr>
            `
            }
    })
    return pag
}

// ---------------------- Outras Funções Auxiliares -----------------------
// ------------------------------------------------------------------------

function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            /*console.log(body)*/
            callback(parse(body))
        })
    }
}

// -------------------------- Setup do Servidor ---------------------------
// ------------------------------------------------------------------------

var toDoListServer = http.createServer(function (req, res) {

    // Logger (que pedido chegou e quando)
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    /* Não uso recursos estáticos */

    // Normal request
    switch(req.method){
        case "GET": 
            // GET /todolist 
            if((req.url == "/") || (req.url == "/todolist")){
                axios.get("http://localhost:3000/todolist?_sort=data,responsavel,estado&_order=asc,asc,asc")
                    .then(response => {
                        var todolist = response.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraToDoList(todolist,d))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Erro: Não foi possível obter a ToDo List.")
                        res.end()
                    })
            }
            // GET /w3.css 
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
            // POST /registar
            if (req.url == '/registar') {
                recuperaInfo(req, resultado => {
                    resultado["estado"]="ativo"
                    axios.post('http://localhost:3000/todolist', resultado)
                        .then(response => {
                            axios.get("http://localhost:3000/todolist/")
                                .then(response => {
                                    var todolist = response.data
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(geraToDoList(todolist,d))
                                    res.end()
                                })
                                .catch(function(erro){
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Erro: Não foi possível obter a ToDo List.")
                                    res.end()
                            })
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Erro no POST: ' + erro + '</p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()                       
                        })
                })
            }
             // POST /acao
            else if (req.url == '/acao') {
                recuperaInfo(req, resultado => {
                    if (JSON.stringify(resultado)=="{}") { console.log("Pedido não processado") } 
                    else {

                        // Processamento da ação
                        var acao = JSON.stringify(resultado).split(":")[1]; 
                        var id = acao.split("T")[1]; id = id.substring(0,id.length-2)
                        acao = acao.split("T")[0]; acao = acao.substring(1,acao.length)
                        
                        // Atualizar o campo "estado" na db
                        var update = {}
                        if  (acao=="finalizar") { update["estado"] = "finalizado"}
                        else if (acao=="cancelar") { update["estado"]= "cancelado"}

                        axios.patch(`http://localhost:3000/todolist/${id}`, update)
                                .then(response => {
                                    axios.get("http://localhost:3000/todolist/")
                                        .then(response => {
                                            var todolist = response.data
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(geraToDoList(todolist,d))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write("<p>Erro: Não foi possível obter a ToDo List.")
                                            res.end()
                                        })
                                })
                                .catch(erro => {
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write('<p>Erro no POST: ' + erro + '</p>')
                                    res.write('<p><a href="/">Voltar</a></p>')
                                    res.end()                            
                                })
                    }
                })    
            }
            else {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<p>Recebi um POST não suportado.</p>')
                res.write('<p><a href="/">Voltar</a></p>')
                res.end()
            }
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
})


toDoListServer.listen(7778)
console.log('Servidor à escuta na porta 7778...')