var gdb = require("../utils/graphdb");

module.exports.lookUp = async function (id){
    var myquery = `select ?p where {:${id} rdf:type :Utilizador;:password ?p.}`;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((Utilizador) => {
		return {
            username : id,
			password: Utilizador.p.value
		};
	});
    return dados[0]
}

module.exports.insert = async function (u){
    var myquery = `INSERT DATA {
        :${u.username} rdf:type owl:NamedIndividual , :Utilizador ;
        :username "${u.username}" ;
        :password "${u.password}" ;
        :fotografia "";
        :dataRegisto "";
        :nome "";
        :descrição "".
    }`;
    var result = await gdb.execTransaction(myquery);
    var dados = {
            username : u.username
		};
    return dados
}

module.exports.insertFollow = async function (u,eve){
    var myquery = `INSERT DATA {
        :${u} :segue :${eve}.
    }`;
    var result = await gdb.execTransaction(myquery);
    return 
}


module.exports.deleteFollow = async function (u,eve){
    var myquery = `DELETE DATA {
        :${u} :segue :${eve}.
    }`;
    var result = await gdb.execTransaction(myquery);
    return 
}


module.exports.follows = async function (id){
    var myquery = `select ?e ?dI ?loc ?mod ?tit where {:${id} rdf:type :Utilizador; :segue ?e. ?e :dataInicio ?dI; :local ?loc; :modalidade ?mod; :título ?tit.}`;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((u) => {
		return {
            id: u.e.value.split("#")[1],
            dataInicio: u.dI.value,
			local: u.loc.value,
			modalidade: u.mod.value,
			titulo: u.tit.value
		};
	});
    return dados
}