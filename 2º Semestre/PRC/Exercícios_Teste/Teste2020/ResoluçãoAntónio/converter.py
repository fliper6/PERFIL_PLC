import csv

with open("fracoes.csv", newline='') as csvfile:
    data = list(csv.reader(csvfile))[1:]
    print(data)



for ind in data:
   print("###  http://www.semanticweb.org/antóniocarvalho/ontologies/myfamily#" + ind[0].replace("Âº ", ""))
   print(f' :{ind[0].replace("Âº ", "")} rdf:type owl:NamedIndividual ,')
   print(f"\t\t\t:Fraçao  ;")
   print(f'\t\t:temMapaPagamento  :M{ind[0].replace("Âº ", "")};')
   print(f'\t\t:mensalidade  {ind[3]};')
   print(f'\t\t:nome "{ind[1]}";')
   print(f"\t\t:permilagem {ind[2]}.")


                         
