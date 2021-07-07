// Controlador para o modelo User

var User = require('../models/user')

// Devolve a lista de Users
module.exports.listar = () => {
    return User
        .find()
        .sort('username')
        .exec()
}

module.exports.consultar = uname => {
    return User
        .findOne({username: uname})
        .exec()
}

module.exports.inserir = u => {
    var novo = new User(u)
    return novo.save()
}

module.exports.remover = function(id){
    return User.deleteOne({_id: id})
}

module.exports.alterar = function(u){
    return User.findByIdAndUpdate({_id: u._id}, u, {new: true})
}
