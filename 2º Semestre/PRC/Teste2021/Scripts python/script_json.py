import json

with open('dataset.json') as f:
    data = json.load(f)

print("### CIDADES --------------------------------------")

for c in data['cidades']:
    cidade = f"""
	###  http://www.di.uminho.pt/prc2021/mapa-virtual#{c['id']}
	:{c['id']} rdf:type owl:NamedIndividual , :Cidade ;
	:descrição "{c['descrição']}" ;
	:distrito "{c['distrito']}" ;
	:nome "{c['nome']}" ;
	:população {c['população']} .
	 """
    print(cidade)

print("### LIGAÇÕES --------------------------------------")

for l in data['ligações']:
    liga = f"""
	###  http://www.di.uminho.pt/prc2021/mapa-virtual#{l['id']}
	:{l['id']} rdf:type owl:NamedIndividual , :Ligação ;
	:destino :{l['destino']} ;
	:origem :{l['origem']} ;
	:distância {l['distância']} .
    """
    print(liga)


EXEMPLO: ##################################################################################################################################
"cidades": [
    {
      "id": "c1",
      "nome": "Paços de Ferreira",
      "população": "400888",
      "descrição": "Occaecat labore quis et irure nulla Lorem. Exercitation excepteur tempor est ex incididunt sunt id veniam culpa reprehenderit. Qui culpa consectetur quis officia ipsum deserunt cupidatat fugiat. Aute aliquip non sit laborum cillum.",
      "distrito": "Porto"
    } 
]