var Aluno = require('../models/aluno')

//Devolve a lista de alunos
module.exports.listar = () => {
    return Aluno
        .find()
        .exec()
}

//Devolver um aluno com um específico id
module.exports.consultar = id => {
    return Aluno
        .findOne({Número: id})
        .exec()
}

//Insere novo aluno
module.exports.inserir = a => {
    var novo = new Aluno(a)
    return novo.save()
}

//Apaga aluno
module.exports.apagar = id => {
    return Aluno
    .deleteOne({Número: id})
    .exec()
}
