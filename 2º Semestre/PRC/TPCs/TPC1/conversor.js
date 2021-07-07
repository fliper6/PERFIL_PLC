var fs = require('fs');
var alunos = require('./alunos.json');
var profs = require('./profs.json');
var ucs = require('./ucs.json');

// ####################################################
function wAlunos() {
    var data = ''
    alunos.alunos.forEach(a => {
        data+= '\n' + '###' + 'http://www.di.uminho.pt/prc2021/uc#' + a._id + '\n'
        data+= ':' + a._id + ':rdf:type owl:NamedIndividual' + ',' + '\n'
        var count = 1
        //Type
        a.type.forEach(t => {
            if (count == a.type.length) data+= '\t\t\t :' + t + ' ;\n'
            else { data+= '\t\t\t :' + t + ',\n' 
                   count++}
        })
        //Frequenta
        count = 1
         a.frequenta.forEach(f => {
            //Só tem 1 UC (;)
            if (count==1 && count == a.frequenta.length) data+= '\t' + ':frequenta ' + ':' + f + ' ;\n'
            //Só tem mais que uma UC (, count++)
            else if (count==1) { data+= '\t' + ':frequenta ' + ' :' + f + ' ,\n' 
                                 count++ }
            //Última UC (;)
            else if (count==a.frequenta.length) data+= '\t\t\t' + ':' + f + ' ;' + '\n'
            //Ainda há mais UCs (, count++)
            else {data+= '\t\t\t' + ':' + f + ' ,\n' 
                  count++}
        })
        //Nome
        data+= '\t' + ':nome ' + '"' + a.name + '"' +  '.' + '\n\n'
    })
    return data
}

// ####################################################
function wProfs() {
    var data = ''

    profs.profs.forEach(p => {
        data+= '\n' + '###' + 'http://www.di.uminho.pt/prc2021/uc#' + p._id + '\n'
        data+= ':' + p._id + ':rdf:type owl:NamedIndividual' + ',' + '\n'
        var count = 1
        //Type
        p.type.forEach(t => {
            if (count == p.type.length) data+= '\t\t\t :' + t + ' ;\n'
            else { data+= '\t\t\t :' + t + ',\n' 
                   count++}
        })
        //Ensina
        count = 1
        p.ensina.forEach(e => {
            if (count == p.ensina.length) data+= '\t' + ':ensina' + ' :' + e + ' ;' + '\n'
            else { data+= + '\t' + ':ensina' + ' :' + e + ' ,' 
                   count++ }
        })
        //Nome
        data+= '\t' + ':nome' + '"' + p.nome + '"' + '.' + '\n\n'
    })
    return data
}

// ####################################################
function wUcs() {
    var data = ''

    ucs.ucs.forEach(u => {
        data+= '\n' + '###' + 'http://www.di.uminho.pt/prc2021/uc#' + u._id + '\n'
        data+= ':' + u._id + ':rdf:type owl:NamedIndividual' + ',' + '\n'
        var count = 1
        //Type
        u.type.forEach(t => {
            if (count == u.type.length) data+= '\t\t\t :' + t + ' ;\n'
            else { data+= '\t\t\t :' + t + ',\n' 
                   count++}
        })
        //EnsinadaPor
        count = 1
        u.éEnsinadaPor.forEach(e => {
            if (count == u.éEnsinadaPor.length) data+= '\t' + ':éEnsinadaPor' + ' :' + e + ' ;' + '\n'
            else { data+= + '\t' + ':éEnsinadaPor' + ' :' + e + ' ,' 
                   count++ }
        })
        //Ano Letivo
        data+= '\t' + ':anoLetivo ' + '"' + u.anoLetivo + '"' + ' ;' + '\n'
        //Designacao 
        data+= '\t' + ':designacao '+ '"' + u.designação + '"' + ' .' + '\n\n'
    })
    return data
}

var data = wProfs() + wUcs() + wAlunos()

//Adicionar 'data' ao ficheiro TTL 
fs.writeFile('output.ttl', data, function (err) {
    if (err) throw err;
    console.log('Sucesso na conversão');
  });