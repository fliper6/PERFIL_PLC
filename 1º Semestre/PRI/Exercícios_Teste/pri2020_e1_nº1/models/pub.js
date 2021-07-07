var mongoose = require('mongoose')

var pubSchema = new mongoose.Schema({
    type: String,
    id: String,
    authors: [ String],
    editor: [String],
    title: String,
    chapter: String,
    pages: String,
    publisher: String,
    booktitle: String,
    journal: String,
    volume: String,
    address: String,
    howpublished: String,
    year: String,
    month: String,
    issn: String,
    isbn: String,
    doi: String
})

// Nome colection = pub + s
module.exports = mongoose.model('pub', pubSchema)