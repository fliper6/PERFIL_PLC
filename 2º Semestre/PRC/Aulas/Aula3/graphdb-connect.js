var axios = require('axios')

var prefixes = `
    PREFIX rdf: <w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <w3.org/2002/07/owl#>
    PREFIX rdfs: <w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <ontotext.com/explicit>
    PREFIX skos: <w3.org/2004/02/skos/core#>
    PREFIX adv: <di.uminho.pt/prc2021/Charada#>
`



var getLink = "localhost:7200/repositories/prc2021-aula3" + "?query=" 
var query = `SELECT * WHERE { adv:A3 ?p ?o }`
var encoded = encodeURIComponent(prefixes + query)


axios.get(getLink + encoded)
    .then(dados => {
        var props = dados.data.results.bindings.map(bind => {return {
            p: bind.p.value.split('#')[1],
            o: (bind.o.type == 'literal') ? bind.o.value : bind.o.value.split('#')[1]
        }})
        console.dir(props)
     })    
    .catch(erro => console.log(erro))