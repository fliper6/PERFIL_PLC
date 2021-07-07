var mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
    comment : String,
    username : String,
    data : {type:Date, default: Date.now},
})

var ratingSchema = new mongoose.Schema({
    _id: String,
    rating: Number
})

var postSchema = new mongoose.Schema({
    type : String,
    titulo: String,
    descricao: String,
    restrictions : String,
    upload_date : {type:Date, default: Date.now},
    id_user : String,
    tags : {type: [String], default:[]},
    estrelas : {type: [ratingSchema], default:[]},
    comment : {type: [commentSchema], default:[]}
})

module.exports = mongoose.model('db' , postSchema)