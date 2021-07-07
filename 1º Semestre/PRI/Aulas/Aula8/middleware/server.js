var express = require('express')
var bodyParser = require('body-parser')
const { stringify } = require('querystring')

var app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(function(req,res,next) {
    console.log(JSON.stringify(req.body))
    next()
})

app.get('/', function(req,res){
    res.status(200).send('Hallo')
})

app.post('*', function(req,res){
    res.status(201).json(JSON.stringify(req.body))
})

app.listen(7700, () => console.log('Servidor está à escuta na porta 7700...'))