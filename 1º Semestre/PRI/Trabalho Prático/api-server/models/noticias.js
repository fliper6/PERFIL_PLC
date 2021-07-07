var mongoose = require('mongoose')

var notSchema = new mongoose.Schema({
    type : String,
    titulo: String,
    upload_date : {type:Date, default: Date.now},
    id_user : String,
    id_post:String
})

module.exports = mongoose.model('noticias' , notSchema)