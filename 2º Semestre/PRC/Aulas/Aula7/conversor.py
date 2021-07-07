import os
from jjcli import *    

f = open("individuals.ttl", "a", encoding="utf-8") 

with open('condominio.txt', 'r', encoding="utf-8") as file:
    data = file.read()

p,*sec_cont = split(r'>>', data)

list_fracs = []
for sec in sec_cont:
    if("Lista" in sec): 
        i = 0
        p,*linha = split(r'\n', sec) 
        for l in linha: 
            if(i == 0): 
                i+=1 ### ignora primeira linha
            else:
                frac = l.split(",")
                list_fracs.append(frac[0].replace("º ", ""))
                f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/condominio#' + frac[0].replace("º ", "") + '\n')
                f.write(':' +  frac[0].replace("º ", "") + ' rdf:type owl:NamedIndividual ,\n') 
                f.write('       :Fracao;\n')
                f.write('   :Designacao ' + '"' + frac[0] + '";\n')
                f.write('   :Frac ' + '"' + frac[1] + '";\n')
                f.write('   :Permilagem ' + '"' + frac[2] + '";\n')
                f.write('   :Mensalidade ' + '"' + frac[3] + '".\n\n')

    if("Mapa" in sec):
        i = 0
        nome_entradasM = []
        p,*linha = split(r'\n', sec) 
        for l in linha[:-1]: 
            if(i == 0): 
                i+=1 ### ignora primeira linha
            else:
                frac = l.split(",")
                nome_entradasM.append("ME" + frac[0].replace("º ", ""))
                f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/condominio#C1_ME' + frac[0].replace("º ", "") + '\n')
                f.write(':C1_ME' +  frac[0].replace("º ", "") + ' rdf:type owl:NamedIndividual ,\n') 
                f.write('       :EntradaM;\n')
                f.write('   :Designacao ' + '"' + frac[0] + '";\n')
                f.write('   :EstadoJan ' + '"' + frac[1] + '";\n')
                f.write('   :EstadoFev ' + '"' + frac[2] + '";\n')
                f.write('   :EstadoMar ' + '"' + frac[3] + '";\n')
                f.write('   :EstadoMai ' + '"' + frac[4] + '";\n')
                f.write('   :EstadoAbr ' + '"' + frac[5] + '";\n')
                f.write('   :EstadoJun ' + '"' + frac[6] + '";\n')
                f.write('   :EstadoJul ' + '"' + frac[7] + '";\n')
                f.write('   :EstadoAgo ' + '"' + frac[8] + '";\n')
                f.write('   :EstadoSet ' + '"' + frac[9] + '";\n')
                f.write('   :EstadoOut ' + '"' + frac[10] + '";\n')
                f.write('   :EstadoNov ' + '"' + frac[11] + '";\n')
                f.write('   :EstadoDez ' + '"' + frac[12] + '".\n\n')

        f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/condominio#C1_Mapa\n')
        f.write(':C1_Mapa  rdf:type owl:NamedIndividual ,\n') 
        f.write('       :Mapa;\n')

        i=0
        for e in nome_entradasM[:-1]:
            if (i == 0): ### primeiro elemento
                f.write('   :temEntradasM :' + e + ',\n') 
                i+=1
            else: 
                f.write('              :' + e  + ',\n')
        f.write('              :' + nome_entradasM[-1] + '.\n\n') ### último elemento

    if("Livro" in sec): 
        i = 0
        nome_entradasL = []
        p,*linha = split(r'\n', sec) 
        for l in linha[:-1]: 
            if(i == 0): 
                i+=1 ### ignora primeira linha
            else:
                frac = l.split(",")
                nome_entradasL.append("ME" + frac[0])
                f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/condominio#C1_LE' + frac[0].replace("/", "_") + '\n')
                f.write(':C1_LE' +  frac[0].replace("/", "_") + ' rdf:type owl:NamedIndividual ,\n') 
                f.write('       :EntradaL;\n')
                f.write('   :Numero ' + '"' + frac[0] + '";\n')
                f.write('   :Tipo ' + '"' + frac[1] + '";\n')
                f.write('   :Data ' + '"' + frac[2] + '";\n')
                f.write('   :Valor ' + '"' + frac[3] + '";\n')
                f.write('   :Entidade ' + '"' + frac[4] + '";\n')
                f.write('   :Descricao ' + '"' + frac[5] + '".\n\n')

        f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/condominio#C1_Livro\n')
        f.write(':C1_Livro rdf:type owl:NamedIndividual ,\n') 
        f.write('       :Livro;\n')

        i=0
        for e in nome_entradasL[:-1]:
            if (i == 0): ### primeiro elemento
                f.write('   :temEntradasL :' + e.replace("/", "_") + ',\n') 
                i+=1
            else: 
                f.write('              :' + e.replace("/", "_")  + ',\n')
        f.write('              :' + nome_entradasL[-1].replace("/", "_") + '.\n\n') ### último elemento

f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/condominio#C1\n')
f.write(':C1 rdf:type owl:NamedIndividual ,\n') 
f.write('       :Condominio;\n')
f.write('   :temLivro :C1Livro;\n') 
f.write('   :temMapa :C1Mapa;\n') 

i=0
for e in list_fracs[:-1]:
    if (i == 0): ### primeiro elemento
        f.write('   :temFrac :' + e + ',\n') 
        i+=1
    else: 
        f.write('              :' + e  + ',\n')
f.write('              :' + list_fracs[-1] + '.\n\n') ### último elemento