var http = require('http')
const axios  = require('axios')

var servidor = http.createServer(function (req,res) {
    if(req.method == 'GET') { 

        /* Home -------------------------------------------------------------------------------------------- */
        if (req.url == '/') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>')
            res.write('<li> <a href=\"http://localhost:3001/alunos\">Lista de Alunos</a> </li>')
            res.write('<li> <a href=\"http://localhost:3001/instrumentos\">Lista de Intrumentos</a> </li>')
            res.write('<li> <a href=\"http://localhost:3001/cursos\">Lista de Cursos</a> </li>')
            res.write('</ul>')
            res.end()
        }

        /* Lista de Alunos --------------------------------------------------------------------------------- */
        else if(req.url == '/alunos') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            axios.get('http://localhost:3000/alunos')
            .then(resp => {
                alunos = resp.data
                res.write('<ul>')
                alunos.forEach(a => {
                    res.write(`<li> <a href=\"http://localhost:3001/alunos/${a.id}\">${a.id}</a> </li>`)
                });
                res.write('</ul>')
                res.end()
            })
            .catch(error => {
                console.log('ERRO: ' + error)
                res.write('<p>Não obtive nenhuma lista de alunos.</p>')
            });

        /* Aluno ------------------------------------------------------------------------------------------- */
        } else if(req.url.match(/^\/alunos\/A[^\/ \?\n]*$/)){
            var divs = req.url.split("/",3)
            var id = divs[2]
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            axios.get('http://localhost:3000/alunos/' + id)
                .then(resp => {
                    a = resp.data
                    res.write(`<h2>Aluno ${a.id}</h2>`)
                    res.write(`<p><b>Nome:</b> ${a.nome}</p>`)
                    res.write(`<p><b>Data de nascimento:</b> ${a.dataNasc}</p>`)
                    res.write(`<p><b>Curso:</b> ${a.curso}</p>`)
                    res.write(`<p><b>Ano:</b> ${a.anoCurso}</p>`)
                    res.write(`<p><b>Instrumento:</b> ${a.instrumento}</p>`)
                    res.end()
                })
                .catch(error => {
                    console.log('ERRO: ' + error)
                    res.write('<p>Não obtive o aluno pedido.</p>')
                }); 

        /* Lista de Instrumentos --------------------------------------------------------------------------- */
        } else if(req.url == '/instrumentos') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            axios.get('http://localhost:3000/instrumentos')
            .then(resp => {
                alunos = resp.data
                res.write('<ul>')
                alunos.forEach(i => {
                    res.write(`<li> <a href=\"http://localhost:3001/instrumentos/${i.id}\">${i.id}</a> </li>`)
                });
                res.write('</ul>')
                res.end()
            })
            .catch(error => {
                console.log('ERRO: ' + error)
                res.write('<p>Não obtive nenhuma lista de instrumentos.</p>')
            });

        /* Instrumento ------------------------------------------------------------------------------------- */
        } else if(req.url.match(/^\/instrumentos\/I[^\/ \?\n]*$/)){
            var divs = req.url.split("/",3)
            var id = divs[2]
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            axios.get(`http://localhost:3000/instrumentos/${id}`)
                .then(resp => {
                    i = resp.data;
                    res.write(`<h2>Instrumento ${i.id}</h2>`)
                    res.write(`<p><b>Nome:</b> ${i['#text']}</p>`)
                    res.end();
                })
                .catch(error => {
                    console.log('ERRO: ' + error)
                    res.write('<p>Não obtive o instrumento pedido.</p>')
                }); 

        /* Lista de Cursos --------------------------------------------------------------------------------- */
        } else if(req.url == '/cursos') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            axios.get('http://localhost:3000/cursos')
            .then(resp => {
                alunos = resp.data
                res.write('<ul>')
                alunos.forEach(c => {
                    res.write(`<li> <a href=\"http://localhost:3001/cursos/${c.id}\">${c.id}</a> </li>`)
                });
                res.write('</ul>')
                res.end()
            })
            .catch(error => {
                console.log('ERRO: ' + error)
                res.write('<p>Não obtive nenhuma lista de cursos.</p>')
            });
 
        /* Curso ------------------------------------------------------------------------------------------- */
        } else if(req.url.match(/^\/cursos\/C[^\/ \?\n]*$/)){
            var divs = req.url.split("/",3)
            var id = divs[2]
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            axios.get(`http://localhost:3000/cursos/${id}`)
                .then(resp => {
                    c = resp.data;
                    res.write(`<h2>Curso ${c.id}</h2>`)
                    res.write(`<p><b>Designação:</b> ${c.designacao}</p>`)
                    res.write(`<p><b>Duração:</b> ${c.duracao}</p>`)
                    res.write(`<p><b>Instrumento:</b> ${c.instrumento['#text']}</p>`)
                    res.end()
                })
                .catch(error => {
                    console.log('ERRO: ' + error)
                    res.write('<p>Não obtive o curso pedido.</p>')
                }); 
    } else{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<p>Pedido nao suportado: ' + res.method + '</p>')
        res.end()
        }
    }
})


servidor.listen(3001)
console.log('Servidor à escuta na porta 3001....')