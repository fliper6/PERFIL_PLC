var express = require("express");
var router = express.Router();
var axios = require("axios");
var gdb = require("../utils/graphdb");
var cors = require('cors');
var EventControl = require('../controllers/evento')

var corsOptions = {
	origin: 'http://localhost:8080',
	optionsSuccessStatus: 200 // For legacy browser support
  }

router.get('/', cors() ,function(req, res, next) {
	res.jsonp("Servidor do mapa a responder...")
});


// Listar Modalidades

router.get('/modalidades' , cors(), async function(req, res, next){
	EventControl.lookUpMods()
	.then(dados => res.status(200).jsonp(dados))
	.catch(err => res.status(500).jsonp(err))
})


// Buscar eventos por modalidade body.modalidade

router.post('/eventos/modalidades' , cors(), async function(req, res, next){
	EventControl.listMod(req.body.modalidade)
	.then(dados => res.status(200).jsonp(dados))
	.catch(err => res.status(500).jsonp(err))
})

// Listar de eventos por data

router.get("/eventos/data", cors() ,async function (req, res, next) {
	var page=0
	if(req.query.page) page = req.query.page-1
	var myquery = `select ?data (GROUP_CONCAT(?s;SEPARATOR="&") as ?eves) where {?s rdf:type :Evento;:dataInicio ?dat.} group by (substr(str(?dat),1,10) as ?data) order by ?data limit 1 offset ${page}`
	var result = await gdb.execQuery(myquery);
	var eve = result.results.bindings[0].eves.value.split('&')
	var eventos = {
		data :result.results.bindings[0].data.value,
	}
	eventos['list']=[]
	for(const even of eve){
		myquery = `select ?mod ?tit ?loc ?dat where {<${even}> :título ?tit; :modalidade ?mod; :dataInicio ?dat; :local ?loc.}`
		var result1 = await gdb.execQuery(myquery);
		var obj = {
			id:even.split('#')[1],
			titulo:result1.results.bindings[0].tit.value,
			modalidade:result1.results.bindings[0].mod.value,
			local:result1.results.bindings[0].loc.value,
			hora:result1.results.bindings[0].dat.value.split('T')[1],
		}
		eventos['list'].push(obj)
	}
	res.status(200).jsonp(eventos)
});


// Número de datas distintas

router.get("/eventos/data/count", cors() ,async function (req, res, next) {
	var myquery = `select (count(distinct(substr(str(?dat),1,10))) as ?total)where {
		?s rdf:type :Evento;:dataInicio ?dat.
}`;
	var result = await gdb.execQuery(myquery);
	var dados = {
		total:parseInt(result.results.bindings[0].total.value)
	}
	res.status(200).jsonp(dados);
});


// Listar eventos por modalidade

router.get("/eventos/modalidades" , cors(), async function(req,res,next){
	var page=0
	if(req.query.page) page = req.query.page-1
	var myquery = `select ?mod (GROUP_CONCAT(?s;SEPARATOR="&") as ?eves) where {?s rdf:type :Evento;:modalidade ?mod.} group by ?mod order by ?mod limit 1 offset ${page}`
	var result = await gdb.execQuery(myquery);
	var eve = result.results.bindings[0].eves.value.split('&')
	var eventos = {
		titulo :result.results.bindings[0].mod.value,
	}
	eventos['list']=[]
	for(const even of eve){
		myquery = `select ?data ?loc ?tit where {<${even}> :título ?tit; :dataInicio ?data; :local ?loc.}`
		var result1 = await gdb.execQuery(myquery);
		var obj = {
			id:even.split('#')[1],
			titulo:result1.results.bindings[0].tit.value,
			data:result1.results.bindings[0].data.value,
			local:result1.results.bindings[0].loc.value
		}
		eventos['list'].push(obj)
	}
	res.status(200).jsonp(eventos)
})




router.options('/*',  cors())


module.exports = router;
