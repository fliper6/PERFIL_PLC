import os
from jjcli import *    

f = open("ind.ttl", "w", encoding="utf-8") ## "W" dá overwrite

with open('livroRD.txt', 'r', encoding="utf-8") as file:
    data = file.read()
    
i = 0
nome_entradasL = []
linha = split(r'\n', data) 
for l in linha: 
        frac = l.split(",")
        nome_entradasL.append("ME" + frac[0])
        f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/condominio#' + frac[0].replace("/", "_") + '\n')
        f.write('<http://www.semanticweb.org/filipa/ontologies/2021/3/condominio#' +  frac[0].replace("/", "_") + '> rdf:type owl:NamedIndividual ,\n') 
        f.write('       :entradaLivro;\n')
        f.write('   :entidade ' + ':' + frac[4].replace("º ", "") + ';\n')
        f.write('   :Numero ' + '"' + frac[0] + '";\n')
        f.write('   :Tipo ' + '"' + frac[1] + '";\n')
        f.write('   :Data ' + '"' + frac[2] + '";\n')
        f.write('   :Valor ' + frac[3] + ';\n')
        f.write('   :Descricao ' + '"' + frac[5] + '".\n\n')