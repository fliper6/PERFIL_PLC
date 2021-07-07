var mongoose = require('mongoose')
var Pub = require('../models/pub')

module.exports.list = () => {
    return Pub.find()
        .select({ "id": 1, "title":1, "year":1, "type":1, "_id": 0})
        .exec()
}

module.exports.listQueryTypeYear = (type,year) => {
    return Pub.find({type:type, year: {$gt:year}}) // Greater than year dado
        .exec()
}

module.exports.listQueryType = (type) => {
    return Pub.find({type:type})
        .exec()
}

module.exports.listQueryAutor = (autor) => {
    return Pub.find({authors:autor})
        .exec()
}

module.exports.listType= () => {
    return Pub.find()
        .select({ "type":1, "_id": 0})
        .distinct('type') // Evitar tipos reptidos
        .exec()
}

module.exports.listAutores= () => {
    return Pub.find()
        .select({"authors":1, "_id":0}) 
        .sort('authors') // Ordenar lista alfabeticamente 
        .exec()
}


// Funcões básicas (save, findOne, deleteOne, ...)
module.exports.lookUp = id => {
    return Pub.findOne({ id: id }).exec()
}

module.exports.insert = p => {
    var newPub = new User(p)
    return newPub.save()
}

module.exports.remove = id => {
    return Pub.deleteOne({ id: id })
}

module.exports.edit = (id, p) => {
    return Pub.findByIdAndUpdate(id, p, { new: true })
}