var mongoose = require('mongoose')
var User = require('../models/user')

// Returns list of paragraphs
module.exports.list = () => {
    return User.find().exec()
}

// Returns a paragraph by id
module.exports.lookUp = id => {
    return User.findOne({ id: id }).exec()
}

// Inserts a new paragraph
module.exports.insert = u => {
    console.log(JSON.stringify(u))
    var newUser = new User(u)
    return newUser.save()
}

// Removes a paragraph by id
module.exports.remove = id => {
    return User.deleteOne({ id: id })
}

// Changes a paragraph
module.exports.edit = (id, u) => {
    return User.findByIdAndUpdate(id, u, { new: true })
}