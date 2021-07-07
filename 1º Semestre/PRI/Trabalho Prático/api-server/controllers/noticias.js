var mongoose = require('mongoose')
var Noticia = require('../models/noticias')

module.exports.list = ()=> {
    return Noticia.find().sort({upload_date:-1}).exec()
}

module.exports.oldest = () => {
    return Noticia.find().sort({upload_date:1}).limit(1).exec()
}


module.exports.insert = u => {
    var newNoticia = new Noticia(u)
    
    return newNoticia.save()
}

module.exports.count = () => {
    return Noticia.countDocuments({})
}

module.exports.remove = id => {
    return Noticia.findByIdAndDelete(id).exec()
}