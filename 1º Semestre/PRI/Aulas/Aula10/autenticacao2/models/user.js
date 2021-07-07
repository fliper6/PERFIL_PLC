var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    id: String,
    password: String
})

module.exports = mongoose.model('user', userSchema)