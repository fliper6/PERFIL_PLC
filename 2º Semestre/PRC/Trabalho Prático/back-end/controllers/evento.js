var gdb = require("../utils/graphdb");

module.exports.listMod = async function(mod){
    var myquery = `select ?s ?tit ?dat ?loc where {?s rdf:type :Evento; :modalidade "${mod}"; :título ?tit; :dataInicio ?dat; :local ?loc.} order by ?dat`;
	var result = await gdb.execQuery(myquery);
	var dados = result.results.bindings.map((Evento) => {
		return {
			id: Evento.s.value.split("#")[1],
			titulo: Evento.tit.value,
			local: Evento.loc.value,
			data: Evento.dat.value,
		};
	});
	return dados

}

module.exports.lookUpMods = async function(mod){
    var myquery = `select ?mod where {
        ?s rdf:type :Evento;
           :modalidade ?mod.
    }group by ?mod order by ?mod`
    var result = await gdb.execQuery(myquery);
    var dados = result.results.bindings.map((Evento) => {
		return {
			modalidade: Evento.mod.value,
		};
	});
    return dados
}