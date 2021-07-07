var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var fs = require('fs')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

var app = express()

// Set logger
app.use(logger('dev'))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

// serve static files
app.use(express.static('public'))

app.get('/', function(req, res){
    var d = new Date().toISOString().substr(0, 16) //vai buscar a hora
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
    res.write(templates.fileList(files,d))
    res.end()
})

app.get('/files/upload', function(req, res){
    var d = new Date().toISOString().substr(0, 16)
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/download/:filename', function(req, res) {
    res.download(__dirname + '/public/fileStore' + req.params.filename)
})

app.post('/files', upload.single('myFile'), function(req, res){
    // req.file is the 'myFile' file
    // req.body will hold the text fields if any
    let quarantinePath = __dirname + '/' + req.file.path
    let newPath = __dirname + '/public/fileStore/' + req.file.originalname

    fs.rename(quarantinePath, newPath, function(err) {

        if(err) {
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'})
            res.write('<p> Erro: ao mover o ficheiro da quarentena...</p>')
            res.end()
        }
        else {
            var d = new Date().toISOString().substr(0, 16)
            var files = jsonfile.readFileSync('./dbFiles.json')
            
            files.push({
                date: d,
                name: req.file.originalname,
                mimetype: req.file.mimetype,
                size: req.file.size
            })

            jsonfile.writeFileSync('./dbFiles.json', files)
            res.redirect('/')
        }
    })
})

app.listen(7701, () => console.log('Servidor está à escuta na port 7701...'))