var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates.js')
var jsonfile = require('jsonfile')
var logger = require('morgan')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

var app = express()

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', function(req,res){
    var d = new Date().toISOString().substr(0,16)
    var files = jsonfile.readFileSync('./dbFiles.json')
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(templates.fileList(files,d))
    res.end()
})

app.get('/files/upload', function(req,res) {
    var d = new Date().toISOString().substr(0, 16)
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.write(templates.fileForm(d))
    res.end()
})

app.post('/files', upload.single('myFile'), function(req,res){
    // req.file is the 'myFile' file
    //req.body will hold the text fields if any
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.write('<pre>' + JSON.stringify(req.file) + '</pre>')
    res.end()
})

app.listen(7701, () => console.log('Servidor está à escuta na porta 7701...'))