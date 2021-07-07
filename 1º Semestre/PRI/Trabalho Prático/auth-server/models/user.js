var mongoose = require('mongoose')


var userSchema = new mongoose.Schema({
    username : String, 
    password : String,
    pic : Boolean,                                  //A existência de uma foto de perfil
    level : {type: String, default:"consumer"},     //Nível de acesso
    filiation : String,                             //Filiação (aluno ou professor)
    register_date : {type:Date, default:Date.now},  //Data de registo
    desc : {type: String, default:""}               //Desrição do perfil

})


module.exports = mongoose.model('user' , userSchema)