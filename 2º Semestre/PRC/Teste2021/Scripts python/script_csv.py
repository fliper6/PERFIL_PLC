import csv
from jjcli import *    

f = open("ind.ttl", "w", encoding="utf-8") ## "W" dá overwrite

with open("ultra-trail.utf8.csv",newline='',encoding="utf-8") as csvfile:
    data = list(csv.reader(csvfile, delimiter=';'))[2:] ## avança primeiras 2 linhas

## Atletas: nome, prova, morada #equipas 
for ind in data:
   f.write("###  http://www.semanticweb.org/antóniocarvalho/ontologies/eventoDesportivo#" + ind[0].replace(" ", "_") + "\n")
   f.write(f' :{ind[0].replace(" ", "_")} rdf:type owl:NamedIndividual ,\n')
   f.write(f"\t\t\t:Atleta  ;\n")
   f.write(f'\t\t:participaEm  :{ind[4].replace(" ", "_")};\n') ##Prova
   f.write(f'\t\t:atletaEm  :{ind[9].replace(" ", "_")};\n') ##Clube
   f.write(f'\t\t:morada "{ind[11]}".\n\n') #Morada
