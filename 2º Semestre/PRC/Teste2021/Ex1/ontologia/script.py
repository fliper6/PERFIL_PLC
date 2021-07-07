import json

f = open("ind.ttl", "w", encoding="utf-8") ## "W" dá overwrite

with open('emd.json', encoding="utf-8") as f:
    data = json.load(f)

for c in data['emd']:
    f = open("ind.ttl", "a", encoding="utf-8")
    emd = f"""
	###  http://www.semanticweb.org/filipa/ontologies/2021/4/emd#{c['_id']}
	:{c['_id']} rdf:type owl:NamedIndividual , :EMD ;
	:index {c['index']} ;
	:dataEMD "{c['dataEMD']}" ;
    :doAtleta :{c['nome']['primeiro']}_{c['nome']['último']} .

    ###  http://www.semanticweb.org/filipa/ontologies/2021/4/emd#{c['nome']['primeiro']}_{c['nome']['último']}
	:{c['nome']['primeiro']}_{c['nome']['último']} rdf:type owl:NamedIndividual , :Atleta ;
	:nome "{c['nome']['primeiro']}_{c['nome']['último']}" ;
	:idade {c['idade']} ;
    :género "{c['género']}" ;
    :morada "{c['morada']}" ;
    :email "{c['email']}" ;
    :federado "{c['federado']}" ;
    :resultado "{c['resultado']}" ;
    :temModalidade :{c['modalidade']} ;
    :temClube :{c['clube'].replace(" ", "_")} .
	 """
    f.write(emd)


