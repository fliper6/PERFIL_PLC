var express = require("express");
var router = express.Router();
var axios = require("axios");
var gdb = require("../utils/graphdb");

router.get('/api/', function(req, res, next) {
	res.jsonp("Servidor do mapa a responder...")
});

// GET/api/emd
router.get("/api/emd", async function (req, res, next) {
	var myquery = `SELECT ?s ?n ?d ?r where { ?s rdf:type m:EMD. ?s m:dataEMD ?d. ?s m:doAtleta ?a. ?a rdf:type m:Atleta. ?a m:nome ?n. ?a m:resultado ?r.} `;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((e) => {
		return {
			id: e.s.value.split("#")[1],
			nome: e.n.value,
			data: e.d.value,
      resultado: e.r.value,
		};
	});
	res.jsonp(dados);
});


// GET api/emd/:id
router.get("/cidades/:id", async function (req, res, next) {
	var myquery = `SELECT * where { m:${req.params.id} rdf:type m:EMD; m:dataEMD ?d; m:index ?i. ?s m:doAtleta ?a. ?a rdf:type m:Atleta; m:nome ?n; m:temClube ?cb; m:temModalidade ?mod; 
                 m:email ?e; m:federado ?f; m:género ?g; m:idade ?id; m:morada ?m; m:resultado ?r } `;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((e) => {
		return {
			id: e.s.value.split("#")[1],
      data: e.d.value,
      index: e.i.value,
			nome: e.n.value,
			clube: e.cb.value.split("#")[1],
			modalidade: e.mod.value.split("#")[1],
      email: e.e.value,
	    federado: e.f.value,
			género: e.g.value,
      idade: e.id.value,
			morada: e.m.value,
      resultado: e.r.value,
		};
	});
	res.jsonp(dados);
});

// GET/api/modalidades
router.get("/api/modalidades", async function (req, res, next) {
	var myquery = `SELECT distinct ?mod where { ?s m:temModalidade ?mod.} `;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((e) => {
		return {
			modalidade: e.mod.value.split("#")[1],
		};
	});
	res.jsonp(dados);
});

// GET /api/emd?res=OK
router.get("/api/emd?res=OK", async function (req, res, next) {
	var myquery = `SELECT ?s where { ?s rdf:type m:EMD. ?s m:doAtleta ?a. ?a rdf:type m:Atleta. ?a m:resultado "True".} `;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((e) => {
		return {
			id: e.s.value.split("#")[1],
    }
	});
	res.jsonp(dados);
});

// GET/api/modalidades/:id
router.get("/api/modalidades/:id", async function (req, res, next) {
	var myquery = `SELECT ?s where { ?s rdf:type m:EMD. ?s m:doAtleta ?a.  ?a rdf:type m:Atleta. ?a m:temModalidade m:${req.params.id} .} `;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((e) => {
		return {
			emd: e.s.value.split("#")[1],
		};
	});
	res.jsonp(dados);
});

// GET/api/atletas?gen=F
router.get("/api/atletas?gen=F", async function (req, res, next) {
	var myquery = `SELECT ?a where { ?a rdf:type m:Atleta. ?a m:género "F" . } ORDER BY ?a `;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((e) => {
		return {
		  atleta: e.a.value.split("#")[1],
		};
	});
	res.jsonp(dados);
});

// GET/api/atletas?clube=X
router.get("/api/atletas?clube=X", async function (req, res, next) {
	var myquery = `SELECT ?a where { ?a rdf:type m:Atleta. ?a m:temClube m:X. } ORDER BY ?a `;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((e) => {
		return {
			atleta: e.a.value.split("#")[1],
		};
	});
	res.jsonp(dados);
});

module.exports = router;