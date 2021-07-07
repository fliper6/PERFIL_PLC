var mongoose = require('mongoose')

var casamentoSchema = new mongoose.Schema({
    date: String,
    title: String,
    ref: String,
    href: String,
    _id: String
})

module.exports = mongoose.model('casamento', casamentoSchema)