const mongoose = require('mongoose')

var tarefaSchema = new mongoose.Schema({
    designacao: { type: String, required: true },
    data: { type: String, required: true },
    desc: String,
    responsavel: String
  });

module.exports = mongoose.model('tarefa', tarefaSchema)