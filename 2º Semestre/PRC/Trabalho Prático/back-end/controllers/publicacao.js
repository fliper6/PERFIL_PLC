var gdb = require("../utils/graphdb");

module.exports.listPub = async function(page){
    var myquery = `select ?s ?tit ?data ?pub ?user ?fotografia where {
        ?s rdf:type :Publicação; 
           :título_publicação ?tit; 
           :data_publicação ?data;
           :publicação ?pub;
           :publicadaPor ?user.
        ?user :fotografia ?fotografia.
    }order by desc(?data) limit 5 offset ${page*5}`
    var result = await gdb.execQuery(myquery);
    var dados = result.results.bindings.map((Publicacao) => {
      return {
        id : Publicacao.s.value.split("#")[1],
        user: Publicacao.user.value.split("#")[1],
        titulo: Publicacao.tit.value,
        data: Publicacao.data.value,
        publicacao : Publicacao.pub.value,
        fotografia: Publicacao.fotografia.value
      };
    });
    return dados
}

module.exports.listPubUser = async function(user){
  var myquery = `select ?s ?tit ?data ?pub where {
      ?s rdf:type :Publicação; 
         :título_publicação ?tit; 
         :data_publicação ?data;
         :publicação ?pub;
         :publicadaPor :${user}.
  }order by desc(?data)`
  var result = await gdb.execQuery(myquery);
  var dados = result.results.bindings.map((Publicacao) => {
    return {
      id : Publicacao.s.value.split("#")[1],
      user: user,
      titulo: Publicacao.tit.value,
      data: Publicacao.data.value,
      publicacao : Publicacao.pub.value
    };
  });
  return dados
}

module.exports.lookUp = async function(id){
  var myquery = `select ?tit ?data ?pub ?user ?fotografia where {
      :${id} :título_publicação ?tit; 
             :data_publicação ?data;
             :publicação ?pub;
             :publicadaPor ?user.
      ?user :fotografia ?fotografia.
  }`
  var result = await gdb.execQuery(myquery);
  var dados = {
      id : id,
      user: result.results.bindings[0].user.value.split("#")[1],
      titulo: result.results.bindings[0].tit.value,
      data: result.results.bindings[0].data.value,
      publicacao : result.results.bindings[0].pub.value,
      fotografia: result.results.bindings[0].fotografia.value
    };
  return dados
}

module.exports.countPub = async function(){
    var myquery = `select ?total where {
      :dados :num_pubs ?total.
    }`;
    var result = await gdb.execQuery(myquery);
    var dados = {
      total:parseInt(result.results.bindings[0].total.value)
    }
    
    return dados
}
module.exports.count = async function(){
  var myquery = `select (count(?s) as ?total) where {
    ?s rdf:type :Publicação.
  }`;
  var result = await gdb.execQuery(myquery);
  var dados = {
    total:parseInt(result.results.bindings[0].total.value)
  }
  
  return dados
}

module.exports.insertPub = async function(pub,titulo,user,num){
    var now = new Date();
    var data = now.toISOString();
    var myquery = `insert data {
    :publicacao${num} rdf:type :Publicação,
                               owl:NamedIndividual;
    	              :publicadaPor :${user};
                      :publicação "${pub}";
                      :data_publicação "${data}"^^xsd:dateTime;
                      :título_publicação "${titulo}".
    }`
    var result = await gdb.execTransaction(myquery);
    var dados = {
            id: "publicacao"+num,
		};

    myquery = `delete { :dados :num_pubs ${num-1} }
               insert { :dados :num_pubs ${num} }
               where { :dados :num_pubs ${num-1} }`
    result = await gdb.execTransaction(myquery);
    return dados 
}


module.exports.delete = async function(post){
  var myquery = `delete {
    :${post} rdf:type owl:NamedIndividual,
                      :Publicação;
             :publicadaPor ?user;
             :data_publicação ?data;
             :título_publicação ?tit;
             :publicação ?pub;
             :comentado ?com.
    ?com rdf:type owl:NamedIndividual,
                  :Comentário;
         :comentadoPor ?us;
         :comentário ?c;
         :dataComentário ?dat.

   }
   where {
    :${post} rdf:type owl:NamedIndividual,
                      :Publicação;
             :publicadaPor ?user;
             :data_publicação ?data;
             :título_publicação ?tit;
             :publicação ?pub;
             :comentado ?com.
    ?com rdf:type owl:NamedIndividual,
                  :Comentário;
         :comentadoPor ?us;
         :comentário ?c;
         :dataComentário ?dat.
   }`;
  var result = await gdb.execTransaction(myquery);
  return { message : 'Removed'}
}

module.exports.edit = async function(id,body,tit){
  var myquery = `delete {
    :${id} :publicação ?pub;
           :título_publicação ?tit.
  }
  insert {
    :${id} :publicação "${body}";
           :título_publicação "${tit}".
  }
  where {
    :${id} :publicação ?pub;
           :título_publicação ?tit.
  }`
  var result = await gdb.execTransaction(myquery);
  var dados = {
          post : body
  };
  
  return dados 
}