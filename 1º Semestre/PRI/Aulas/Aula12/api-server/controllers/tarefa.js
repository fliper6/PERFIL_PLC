// Controlador para o modelo Tarefa

var Tarefa = require('../models/tarefa')

// Devolve a lista de Tarefas
module.exports.listar = () => {
    return Tarefa
        .find()
        .sort('-data')
        .exec()
}

module.exports.consultar = id => {
    return Tarefa
        .findOne({_id: id})
        .exec()
}

module.exports.inserir = t => {
    var novo = new Tarefa(t)
    return novo.save()
}

module.exports.remover = function(id){
    return Tarefa.deleteOne({_id: id})
}

module.exports.alterar = function(t){
    return Tarefa.findByIdAndUpdate({_id: t._id}, t, {new: true})
}
