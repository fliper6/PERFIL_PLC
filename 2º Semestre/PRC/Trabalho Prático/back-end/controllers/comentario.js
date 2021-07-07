var gdb = require("../utils/graphdb");


module.exports.insertCom = async function(pub,user,com,num){
    var now = new Date();
    var data = now.toISOString();
    var myquery = `insert data {
		:${pub} :comentado :comentario${num}.
    :comentario${num} rdf:type owl:NamedIndividual,
                               :Comentário;     
    	                :comentadoPor :${user};
                      :comentário "${com}";
                      :dataComentário "${data}"^^xsd:dateTime.
    	
    }`
    var result = await gdb.execTransaction(myquery);
    var dados = {
            comentario : com
		};
    
    myquery = `delete { :dados :num_coms ${num-1} }
               insert { :dados :num_coms ${num} }
               where { :dados :num_coms ${num-1} }`
    result = await gdb.execTransaction(myquery);
    return dados 
}

module.exports.listCom = async function(pub){
    var myquery = `select ?com ?user ?comment ?data where{
      :${pub} rdf:type :Publicação;:comentado ?com.
      ?com :comentadoPor ?user;
           :comentário ?comment;
           :dataComentário ?data.
        
      }order by desc(?data)`
    var result = await gdb.execQuery(myquery);
    var dados = result.results.bindings.map((Comentario) => {
      return {
        id : Comentario.com.value.split("#")[1],
        user: Comentario.user.value.split("#")[1],
        comentario: Comentario.comment.value,
        data: Comentario.data.value
      };
    });
    return dados 
}

module.exports.countCom = async function(){
    var myquery = `select ?total where {
      :dados :num_coms ?total.
    }`;
    var result = await gdb.execQuery(myquery);
    var dados = {
      total:parseInt(result.results.bindings[0].total.value)
    }
    return dados
}

module.exports.delCom = async function(post,com){
  var myquery = `delete {
    :${post} :comentado :${com}.
    :${com} rdf:type :Comentário,
                     owl:NamedIndividual;
            :comentadoPor ?user;
            :comentário ?com;
            :dataComentário ?data.

   }
   where {
    :${com} rdf:type :Comentário;
            :comentadoPor ?user;
            :comentário ?com;
            :dataComentário ?data.
   }`;
  var result = await gdb.execTransaction(myquery);
  return { message : 'Removed'}
}

module.exports.editCom = async function(id,body,data){
  var myquery = `delete {
    :${id} :comentário ?com;
           :dataComentário ?dat.
  }
  insert {
    :${id} :comentário "${body}";
           :dataComentário "${data}"^^xsd:dateTime.
  }
  where {
    :${id} :comentário ?com;
           :dataComentário ?dat.
  }`
  var result = await gdb.execTransaction(myquery);
  var dados = {
          comentario : body
  };
  
  return dados 
}