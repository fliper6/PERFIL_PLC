var express = require("express");
var router = express.Router();
var axios = require("axios");
var gdb = require("../utils/graphdb");
var cors = require('cors');
var CommentControl = require('../controllers/comentario')
var PubControl = require('../controllers/publicacao')

var corsOptions = {
	origin: 'http://localhost:8080',
	optionsSuccessStatus: 200 // For legacy browser support
}

// Publicações por página

router.get("/" , cors(), async function(req,res,next){
    var page = 1
    if(req.query.page) page = req.query.page
    PubControl.listPub(page-1)
    .then(dados => res.status(200).jsonp(dados))
    .catch(err => res.status(500).jsonp({error : "Error getting post list"}))
})

// Publicações do user :id

router.get("/user/:id" , cors(), async function(req,res,next){
    PubControl.listPubUser(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(err => res.status(500).jsonp({error : "Error getting post list"}))
})

// Número total de publicações

router.get("/count", cors() ,async function (req, res, next) {
	PubControl.count()
	.then(dados => {
		res.status(200).jsonp(dados)
	})
	.catch(err => res.status(500).jsonp({error:err}))
});

// Novo comentário na publicação :id

router.post("/comentarios/:id", cors() ,async function (req, res, next) {
	CommentControl.countCom()
	.then(dados => {
		CommentControl.insertCom(req.params.id,req.body.user,req.body.comentario,dados.total+1)
		.then(dat => res.status(200).jsonp(dat))
		.catch(err => res.status(500).jsonp({error:err}))
	})
	.catch(err => res.status(500).jsonp({error:err}))
});

// Lista de comentários da publicação :id

router.get("/comentarios/:id", cors() ,async function (req, res, next) {
	CommentControl.listCom(req.params.id)
		.then(dat => res.status(200).jsonp(dat))
		.catch(err => res.status(500).jsonp({error:err}))
});

// Remover comentário query.id da publicação :id e

router.delete("/comentarios/:id", cors() ,async function (req, res, next) {
	CommentControl.delCom(req.params.id,req.query.id)
		.then(dat => res.status(200).jsonp(dat))
		.catch(err => res.status(500).jsonp({error:err}))
});

// Editar comentário :id com 

router.put("/comentarios/:id", cors() ,async function (req, res, next) {
	CommentControl.editCom(req.params.id,req.body.body,req.body.data)
		.then(dat => res.status(200).jsonp(dat))
		.catch(err => res.status(500).jsonp({error:err}))
});

// Busca da publicação :id

router.get("/:id" , cors(), async function(req,res,next){
    PubControl.lookUp(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(err => res.status(500).jsonp({error : "Error getting post " +  req.params.id}))
})

// Remover a publicação :id

router.delete("/:id" , cors(), async function(req,res,next){
    PubControl.delete(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(err => res.status(500).jsonp({error : "Error deleting post " +  req.params.id}))
})

// Editar a publicação :id

router.put("/:id" , cors(), async function(req,res,next){
    PubControl.edit(req.params.id, req.body.body, req.body.titulo)
    .then(dados => res.status(200).jsonp(dados))
    .catch(err => res.status(500).jsonp({error : "Error editing post " +  req.params.id}))
})

// Inserir nova publicação

router.post("/", cors() ,async function (req, res, next) {
	PubControl.countPub()
	.then(dados => {
		PubControl.insertPub(req.body.publicacao,req.body.titulo,req.body.user,dados.total+1)
		.then(dat => res.status(200).jsonp(dat))
		.catch(err => res.status(500).jsonp({error:err}))
	})
	.catch(err => res.status(500).jsonp({error:err}))
});



  
router.options('/*',  cors())


module.exports = router;
