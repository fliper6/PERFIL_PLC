// Paragraph model -----------------------
var mongoose = require('mongoose')

var paraSchema = new mongoose.Schema({
    text: String
})

module.exports = mongoose.model('para', paraSchema)