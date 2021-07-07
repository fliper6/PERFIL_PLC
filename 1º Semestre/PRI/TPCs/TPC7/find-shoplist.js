//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/shoplist';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error...'));
db.once('open', function() {
    console.log("Conexão ao MongoDB realizada com sucesso...")
});

var shoplistSchema = new mongoose.Schema({
    Product: String,
    Quantity: Number,
    Category: String
});

var shoplistModel = mongoose.model('list', shoplistSchema)

shoplistModel
    .find(function (err,docs) {
        if(err){
            console.log("Error " + err)
        }
        else{
            docs.forEach(d => {
                console.log(d.Category + " - " + d.Product + " - " + d.Quantity)
            })
        }
    })

console.log("That's all folks...")
