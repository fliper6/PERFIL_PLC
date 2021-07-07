var axios = require('axios')
var prefixes = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX noInferences: <http://www.ontotext.com/explicit>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX : <http://www.di.uminho.pt/prc/tp#>
        `           

exports.execQuery = async function (query){
    var getLink = "http://localhost:7200/repositories/PRC_TP?query="
    var encoded = encodeURIComponent(prefixes + query)
    var result = await axios.get(getLink + encoded)
    return result.data
}

exports.execTransaction = async function(query){
    var postLink = "http://localhost:7200/repositories/PRC_TP/statements"
    var encoded = encodeURIComponent(prefixes + query)
    var response
    try{
        response = await axios.post(postLink, `update=${encoded}`)
        return response.data
    }catch(error){
        throw(error)
    }
}
