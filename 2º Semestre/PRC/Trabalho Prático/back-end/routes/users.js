var express = require("express");
var router = express.Router();
var formidable = require('formidable');
var axios = require("axios");
var gdb = require("../utils/graphdb");
var jwt = require('jsonwebtoken');
var passport = require('passport')
var UserControl = require('../controllers/user')
var cors = require('cors');

var corsOptions = {
	origin: 'http://localhost:8080',
	optionsSuccessStatus: 200 // For legacy browser support
  }


// Lista de eventos seguidos pelo utilizador :id

router.get("/eventos/:id",cors() ,async function (req, res, next) {
	UserControl.follows(req.params.id)
	.then(dados => res.status(200).jsonp(dados))
	.catch(err => res.status(500).jsonp(err))
});

// Ir buscar info de utilizador

router.get("/:id",cors() ,async function (req, res, next) {
	var myquery = `select ?user ?nome ?descrição ?fotografia ?dataRegisto where {:` + req.params.id + ` :username ?user; :nome ?nome; :descrição ?descrição; :fotografia ?fotografia; :dataRegisto ?dataRegisto. }`;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((u) => {
		return {
			username: u.user.value,
			nome: u.nome.value,
			descrição: u.descrição.value,
			fotografia: u.fotografia.value,
			dataRegisto: u.dataRegisto.value
		};
	});
	res.status(200).jsonp(dados);
});

// Mudar foto do utilizador

router.post("/image/:id",cors() , async function (req, res, next) {
	var foto_nova = "pfp/1 (" + req.body.cur + ").png"
	var myquery = `DELETE WHERE{ :` + req.params.id + ` :fotografia ?foto .}; INSERT {:` + req.params.id + ` :fotografia \"`+ foto_nova +`\" } WHERE {:` + req.params.id + ` rdf:type :Utilizador.}`;
	var result = await gdb.execTransaction(myquery);
	res.jsonp("Fotografia alterada." + result);
});

// Editar informação de um utilizador

router.post("/edit/:id",cors() , async function (req, res, next) {
	var myquery = `DELETE WHERE{ :` + req.params.id + ` :descrição ?desc; :nome ?nom. }; INSERT {:` + req.params.id + ` :descrição \"`+ req.body.description +`\"; :nome \"` + req.body.name + `\". } WHERE {:` + req.params.id + ` rdf:type :Utilizador.}`;
	var result = await gdb.execTransaction(myquery);
	res.jsonp("Perfil alterado." + result);
});


// Follow e unfollow de um evento 

router.put("/follow/:id",cors() , async function (req, res, next) {
	UserControl.insertFollow(req.params.id, req.body.evento)
	.then(() => {
		UserControl.follows(req.params.id)
		.then(dados => res.status(200).jsonp(dados))
		.catch(err => res.status(500).jsonp(err))
	})
	.catch( err => res.status(500).jsonp(err))
});

router.delete("/unfollow/:id",cors() , async function (req, res, next) {
	UserControl.deleteFollow(req.params.id, req.body.evento)
	.then(() => {
		UserControl.follows(req.params.id)
		.then(dados => res.status(200).jsonp(dados))
		.catch(err => res.status(500).jsonp(err))
	})
	.catch( err => res.status(500).jsonp(err))
});

module.exports = router;
