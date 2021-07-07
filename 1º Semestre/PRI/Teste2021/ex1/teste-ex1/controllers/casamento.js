var mongoose = require('mongoose')
var Casamento = require('../models/casamento')


module.exports.alinea1 = () => {
    return Casamento.find()
        .select({ "date": 1, "title":1, "ref":1, "_id":0})
        .exec()
}

module.exports.alinea2 = id => {
    return Casamento.findOne({_id: id }).exec()
}

module.exports.alinea3 = (nome) => {
    return Casamento.find({title: {$regex: ".*" + nome + ".*"}}) // o nome tem de estar incluído algures (início, meio ou fim)
        .exec()
}

module.exports.alinea4 = (ano) => {
    return Casamento.find({date: {$regex: ano + "\/" + ".*"}} || {date: {$regex: ".*" + "\/" + ano}})  // o ano tem de estar antes do '/' ou depois
        .exec()
}

/*
module.exports.alinea5 = (byAno) => {
    return Casamento.find()  
        .exec()
} */

module.exports.alinea6 = () => {
    return Casamento.find()  
        .select({"title":1, "_id":0})
        .split(":")[1]
        .split("c.c.")
        .exec()  
}
