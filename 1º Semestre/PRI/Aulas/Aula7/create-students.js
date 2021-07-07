//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/PRI2020';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
    console.log("Conexão ao MongoDB realizada com sucesso...")
});

var studentSchema = new mongoose.Schema({
    Número: String,
    Nome: String,
    Git: String,
    tpc: [Number]
});

var studentModel = mongoose.model('students', studentSchema)

var data = [
    {
      "Número": "A76089",
      "Nome": "Etienne Costa",
      "Git": "https://github.com/EtienneCosta/Mestrado/tree/main/PRI2020",
      "tpc": [1,1,1,1,1]
    },
    {
      "Número": "A85954",
      "Nome": "Luís Ribeiro",
      "Git": "https://github.com/luis1ribeiro/PRI2020/tree/main/pri/tpcs",
      "tpc":[1,1,1,1,1,1]
    },
    {
      "Número": "A76936",
      "Nome": "Luís Ferreira",
      "Git": "https://github.com/miguel5/PRI2020",
      "tpc": [1,1,1,1,1,1]
    },
    {
      "Número": "A79751",
      "Nome": "Diogo Rocha",
      "Git": "https://github.com/diogoalves10/PRI.git",
      "tpc": [1,1,1,1,1]
    },
    {
      "Número": "A82238",
      "Nome": "João Pedro Gomes",
      "Git": "https://github.com/JoaoGome/PRI2020",
      "tpc": [1,1,1,1,1,1]
    },
    {
      "Número": "A60201",
      "Nome": "Tiago Moreira",
      "Git": "https://github.com/TiagoMoreira10/PRI2020",
      "tpc": [1,1,1]
    },
    {
      "Número": "A85813",
      "Nome": "António Lindo",
      "Git": "https://github.com/AntonioG70/PRI2020",
      "tpc": [1,1,1,1,1]
    },
    {
      "Número": "A80624",
      "Nome": "Sofia Teixeira",
      "Git": "https://github.com/sotexera6/PRI2020/",
      "tpc": [1,1,1,1,1]
    },
    {
      "Número": "A82263",
      "Nome": "Moisés Antunes",
      "Git": "https://github.com/MoisesA14/PRI2020",
      "tpc": [1]
    }
  ]

studentModel.create(data)

console.log("That's all folks...")
