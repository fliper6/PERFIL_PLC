var express = require("express");
var router = express.Router();
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



// Login

router.post('/', cors() ,passport.authenticate('local'), function(req,res){
	jwt.sign({username: req.user.username, 
			  sub:'Trabalho de PRC2021'},
			  "PRC2021",
			  function(e,token){
				if(e) res.status(500).jsonp({error: "Erro na geração do token: " + e})
				else res.status(201).jsonp({token: token,username: req.user.username})
	});
  })


// Registo

router.post('/register', cors() ,(req,res) => {
	UserControl.lookUp(req.body.username)
	  .then(da => {
		if(da == null){
		  UserControl.insert(req.body)
			.then(data => {
				
			  res.status(201).jsonp({username:data.username})
			})
			.catch(err => {
				console.log(err)
				res.status(500).jsonp({error:err})
			}
				)
		}
		else{
		  res.status(400).jsonp({message:"Username already in use!"})
		  
		}
	  })
	  .catch(err => res.status(500).jsonp(err))
	
  })


module.exports = router;
