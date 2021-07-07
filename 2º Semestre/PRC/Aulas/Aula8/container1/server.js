var http = require('http')
var fs = require('fs')

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const urlSplit = req.url.split('/');
    const page = urlSplit[1]
    fs.readFile('arq' + page + '.html', (err,data) =>{
        if(err){
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write("<p>No file.</p>");
            res.end();
        }
        else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    })
}).listen(7777);
console.log('Servidor à escuta na porta 7777....')