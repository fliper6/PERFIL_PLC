import os
from jjcli import *    

f = open("individuals.ttl", "w", encoding="utf-8") 

with open('dataset_cidades.txt', 'r', encoding="utf-8") as file:
    data = file.read()

arrayO = []
arrayD = []

secC = findall(r'"cidades": \[([\w\W]*?)\]', data) # captura tudo até aos primeiros ] que encontra
cidades = findall(r'{([\w\W]*?)},', secC[0])
secL = findall(r'"ligações": \[([\w\W]*?)\]', data)
ligações = findall(r'{([\w\W]*?)},', secL[0])

for l in ligações:
    id = findall(r'"id": "(.*?)"',l)
    origem = findall(r'"origem": "(.*?)"',l)
    destino = findall(r'"destino": "(.*?)"',l)
    distância = findall(r'"distância": (.*)',l)

    arrayO.append((id[0], origem[0]))
    arrayD.append((id[0], destino[0]))

    f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/ligação#' + id[0] + '\n')
    f.write(':' + id[0] + ' rdf:type owl:NamedIndividual ,\n') 
    f.write('       :Ligação;\n')
    f.write('   :id ' + '"' + id[0] + '";\n')
    f.write('   :origem ' + '"' + origem[0] + '";\n')
    f.write('   :destino ' + '"' + destino[0] + '";\n')
    f.write('   :distância ' + '"' + distância[0] + '"^^xsd:float .\n\n') #guardar como float

for c in cidades:
    id = findall(r'"id": "(.*?)"',c)
    nome = findall(r'"nome": "(.*?)"',c)
    população = findall(r'"população": "(.*?)"',c)
    descrição = findall(r'"descrição": "(.*?)"',c)

    f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/cidades#' + id[0] + '\n')
    f.write(':' + id[0] + ' rdf:type owl:NamedIndividual ,\n') 
    f.write('       :Cidade;\n')
    f.write('   :id ' + '"' + id[0] + '";\n')
    f.write('   :nome ' + '"' + nome[0] + '";\n')
    f.write('   :população ' + '"' + população[0] + '"^^xsd:integer ;\n') #guardar como int

    éorigem = []
    édestino = []

    for a in arrayO:
        if (id[0] == a[1]): 
            éorigem.append(a[0])

    for a in arrayD:
        if (id[0] == a[1]): 
            édestino.append(a[0])

    i = 0
    j = 0

    if(len(éorigem) > 1): ## mais que uma ligação
        for par in éorigem[:-1]:
            if (i == 0): ## primeiro elemento
                f.write('   :éOrigem :' + par + ',\n') 
                i+=1
            else: 
                f.write('            :' + par + ',\n')
        f.write('            :' + éorigem[-1] + ';\n') ## último elemento
    elif(len(éorigem) == 1): ## só 1 ligação 
        f.write('   :éOrigem :' + éorigem[0] + ';\n') 

    if(len(édestino) > 1): ## mais que uma ligação
        for par in édestino[:-1]:
            if (j == 0): ## primeiro elemento
                f.write('   :éDestino :' + par + ',\n') 
                j+=1
            else: 
                f.write('             :' + par + ',\n')
        f.write('             :' + édestino[-1] + ';\n') ## último elemento
    elif(len(édestino) == 1): ## só 1 ligação 
        f.write('   :éDestino :' + édestino[0] + ';\n')

    f.write('   :descrição ' + '"' + descrição[0] + '".\n\n')