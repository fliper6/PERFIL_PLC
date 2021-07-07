import json

ind = open("ind.ttl","w",encoding="utf-8") 

with open('eventos.json',encoding="utf-8") as f:
    data = json.load(f)

i = 0
for u in data['eventos']:
    i = i+1
    ind.write("###  http://www.di.uminho.pt/prc/tp#evento"+ str(i) +"\n")
    ind.write(":evento" + str(i) + " rdf:type owl:NamedIndividual , :Evento ;\n")
    ind.write("     :título \"" + u['título'] + "\" ;\n")
    ind.write("     :local \"" + u['local'] + "\" ;\n")
    ind.write("     :modalidade \"" + u['desporto'] + "\" ;\n")
    
    dia = u['dia']
    horaI =  u['horaInício']
    horaF =  u['horaFinal']
    
    mm = ""

    if "July" in dia:
        mm = "07-"
    else:
        mm = "08-"

    dd = dia.split(" ")

    h1 = ""
    if("pm" in horaI):
        h11 = horaI[:-2].split(":")
        hor = int(h11[0]) + 12
        if len(h11) > 1:
            h1 = str(hor) + ":" + h11[1]
        else:
            h1 = str(hor) + ":00"
    else: 
        h11 = horaI[:-2].split(":")
        if len(h11) < 2:
            h1 = h11[0] + ":00"
        else:
            h1 = horaI[:-2]


    h2 = ""
    if("pm" in horaF):
        h22 = horaF[:-2].split(":")
        hor = int(h22[0]) + 12
        if len(h22) > 1:
            h2 = str(hor) + ":" + h22[1]
        else:
            h2 = str(hor) + ":00"
    else: 
        h22 = horaF[:-2].split(":")
        if len(h22) < 2:
            h2 = h22[0] + ":00"
        else:
            h2 = horaF[:-2]
    
    day = dd[1]
    nd = int(dd[1])
    if(nd < 10 and nd>= 1):
        day = "0" + dd[1]

    ind.write("     :dataInicio \"2021-" + mm + day + "T" + h1 + ":00\"^^xsd:dateTime ;\n")
    ind.write("     :dataFim \"2021-" + mm + day + "T" + h2 + ":00\"^^xsd:dateTime .\n\n")

