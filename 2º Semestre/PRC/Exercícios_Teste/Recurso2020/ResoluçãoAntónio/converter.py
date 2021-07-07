import csv

with open("ultra-trail.utf8.csv",newline='') as csvfile:
    data = list(csv.reader(csvfile, delimiter=';'))[2:]
    #print(data)
    



for ind in data:
   print("###  http://www.semanticweb.org/antóniocarvalho/ontologies/eventoDesportivo#" + ind[0].replace(" ", "_"))
   print(f' :{ind[0].replace(" ", "_")} rdf:type owl:NamedIndividual ,')
   print(f"\t\t\t:Atleta  ;")
   print(f'\t\t:participaEm  :{ind[4].replace(" ", "_")};')
   print(f'\t\t:atletaEm  :{ind[9].replace(" ", "_")};')
   print(f'\t\t:email "{ind[1]}";')
   print(f'\t\t:situacao "{ind[2]}";')
   print(f'\t\t:dataSituacao "{ind[3]}";')
   print(f'\t\t:tipoPagamento "{ind[6]}";')
   if(ind[7]):
       print(f'\t\t:numEvento {ind[7]};')
   if(ind[8]):
       print(f'\t\t:numTipo "{ind[8]}";')
   print(f'\t\t:telefone {ind[10]};')
   print(f'\t\t:morada "{ind[11]}";')
   if(ind[12]):
       print(f'\t\t:nif {ind[12]};')
   if(ind[13]):
       print(f'\t\t:siCard {ind[13]};') 
   if(ind[17]):
       print(f'\t\t:tshirt "{ind[17]}";')
   if(ind[23]):
        print(f'\t\t:biCC {ind[23]};')
   if(ind[24]):    
        print(f'\t\t:biCC "{ind[24]}";')
   print(f'\t\t:dataNascimento "{ind[25]}";')
   print(f'\t\t:escalao "{ind[26]}".')            
   



                         
