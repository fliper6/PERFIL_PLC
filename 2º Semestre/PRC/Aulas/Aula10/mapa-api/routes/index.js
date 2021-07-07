var express = require("express");
var router = express.Router();
var axios = require("axios");
var gdb = require("../utils/graphdb");

router.get('/', function(req, res, next) {
	res.jsonp("Servidor do mapa a responder...")
});

router.get("/cidades", async function (req, res, next) {
	var myquery = `SELECT ?s ?nome ?distrito WHERE { ?s a m:Cidade . ?s m:nome ?nome . ?s m:distrito ?distrito . } ORDER BY ?s`;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((Cidade) => {
		return {
			id: Cidade.s.value.split("#")[1],
			nome: Cidade.nome.value,
			distrito: Cidade.distrito.value,
		};
	});
	res.jsonp(dados);
});

router.get("/cidades/:id", async function (req, res, next) {
	var myquery = `SELECT ?nome ?distrito ?populacao ?descricao WHERE {m:${req.params.id} a m:Cidade ; m:nome ?nome ; m:distrito ?distrito ; m:populacao ?populacao ; m:descricao ?descricao . } ORDER BY ?nome`;
	var result = await gdb.execQuery(myquery);
	myquery = `SELECT ?c ?n ?dist WHERE { ?s a m:Ligacao ; m:origem m:${req.params.id}; m:destino ?c; m:distancia ?dist. ?c m:nome ?n . } ORDER BY ?n`;
	var ligacoes = await gdb.execQuery(myquery);
	var lig = ligacoes.results.bindings.map((l) => {
		return {
			id: l.c.value.split("#")[1],
			nome: l.n.value,
			distancia: l.dist.value,
		};
	});
	var dados = result.results.bindings.map((Cidade) => {
		return {
			id: req.params.id,
			nome: Cidade.nome.value,
			distrito: Cidade.distrito.value,
			populacao: Cidade.populacao.value,
			descricao: Cidade.descricao.value,
			ligacoes: lig,
		};
	});
	res.jsonp(dados[0]);
});

router.post("/cidades", async function (req, res, next) {
	var myquery = `INSERT DATA {
		m:${req.body.id} rdf:type owl:NamedIndividual , m:Cidade ;
		m:descricao "${req.body.descricao}" ;
		m:distrito "${req.body.distrito}" ;
		m:nome "${req.body.nome}" ;
		m:populacao ${req.body.populacao} .
	}`;

	var result = await gdb.execTransaction(myquery);
	res.jsonp("Triplos inseridos ... " + myquery);
});

router.delete("/cidades/:id", async function (req, res, next) {
	var Cidade = await axios.get("http://localhost:13000/cidades/" + req.params.id);
	var myquery = ` DELETE DATA {
    	m:${Cidade.data.id} m:descricao "${Cidade.data.descricao}" ;
			m:distrito "${Cidade.data.distrito}" ;
			m:nome "${Cidade.data.nome}" ;
			m:populacao ${Cidade.data.populacao} .
	}`;
	var result = await gdb.execTransaction(myquery);
	res.jsonp("Triplos apagados ... " + result);
});

module.exports = router;
