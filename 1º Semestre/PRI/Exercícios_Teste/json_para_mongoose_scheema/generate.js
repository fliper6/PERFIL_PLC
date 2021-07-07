var jsonObject={ "cars": [
            {"model":"Sentra", "doors":4},
            {"model":"Maxima", "doors":4},
            {"model":"Skyline", "doors":2}
        ]
    }

    var GenerateSchema = require('generate-schema')
    var schema = GenerateSchema.json('Product',jsonObject);
    
    console.log(JSON.stringify(schema))

