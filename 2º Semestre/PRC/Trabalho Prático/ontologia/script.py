#!/usr/bin/python3

import re
from sys import int_info
from jjcli import *       
##from bs4 import BeautifulSoup as bs 
##mport requests
##from requests.exceptions import ConnectionError

## Ir buscar o html ao site e formata-lo

##html2 = open("html","w",encoding="utf-8") 

##html = requests.get("https://www.theroar.com.au/olympics/olympics-events-schedule/") 
##soup = bs(html.text,"html.parser")
##soup_string = str(soup)

##html2.write(soup_string)

########################################################################################

json = open("eventos.json","w",encoding="utf-8") 
html2 = open("html","r",encoding="utf-8") 
pag = html2.read()

json.write("{\n") 
json.write("\t\"eventos\": [\n") 

dias = re.compile("<h2>[\w ]*Day [0-9]+? \([\w?]+, (.+?)\)<\/h2>").split(pag)

for n in range(1,len(dias)-1,2): ##dia
    data = dias[n]
    pag = dias[n+1]
    desportos = re.compile("<h3>(.+?)</h3>").split(pag)
    
    for n in range(1,len(desportos),2): ##desporto
        desp = desportos[n]
        pag = desportos[n+1]
        horas = re.compile(">([0-9:]*?[pa]m)-([0-9:]*?[pa]m)<\/td>").split(pag)

        venue = ""

        for n in range(1,len(horas)-1,3): ##horas
            horaInicial = horas[n]
            horaFinal = horas[n+1]
            pag = horas[n+2]

            umVenue = re.findall("<td>(.*?)<\/td>\n<td rowspan=\"[0-9]*?\">(.*?)<\/td>\n<[\/]*tr>",pag)
            multVenue = re.findall("<td>(.*?)<\/td>\n<td>(.*?)<\/td>\n<[\/]*tr>",pag)

            if (umVenue): ##tem 1 venue
                venue = umVenue[0][1]
                json.write("\t\t{\n") 
                json.write("\t\t\t\"desporto\": \"" + desp + "\",\n")
                json.write("\t\t\t\"dia\": \"" + data + "\",\n")
                json.write("\t\t\t\"horaInício\": \"" + horaInicial + "\",\n")
                json.write("\t\t\t\"horaFinal\": \"" + horaFinal + "\",\n")
                json.write("\t\t\t\"título\": \"" + umVenue[0][0] + "\",\n")
                json.write("\t\t\t\"local\": \"" + umVenue[0][1] + "\"\n")
                json.write("\t\t},\n") 

                restoVenue = re.findall("<td>(.*?)<\/td>\n<[\/]*tr>",pag) 

                for n in restoVenue:
                    json.write("\t\t{\n") 
                    json.write("\t\t\t\"desporto\": \"" + desp + "\",\n")
                    json.write("\t\t\t\"dia\": \"" + data + "\",\n")
                    json.write("\t\t\t\"horaInício\": \"" + horaInicial + "\",\n")
                    json.write("\t\t\t\"horaFinal\": \"" + horaFinal + "\",\n")
                    json.write("\t\t\t\"título\": \"" + n + "\",\n")
                    json.write("\t\t\t\"local\": \"" + umVenue[0][1] + "\"\n")
                    json.write("\t\t},\n") 

            elif(multVenue):
                for n in multVenue:
                    json.write("\t\t{\n") 
                    json.write("\t\t\t\"desporto\": \"" + desp + "\",\n")
                    json.write("\t\t\t\"dia\": \"" + data + "\",\n")
                    json.write("\t\t\t\"horaInício\": \"" + horaInicial + "\",\n")
                    json.write("\t\t\t\"horaFinal\": \"" + horaFinal + "\",\n")
                    json.write("\t\t\t\"título\": \"" + n[0] + "\",\n")
                    json.write("\t\t\t\"local\": \"" + n[1] + "\"\n")
                    json.write("\t\t},\n") 
            else:
                zeroVenue = re.findall("<td>(.*?)<\/td>\n<[\/]*tr>",pag)
                for n in zeroVenue:
                    json.write("\t\t{\n") 
                    json.write("\t\t\t\"desporto\": \"" + desp + "\",\n")
                    json.write("\t\t\t\"dia\": \"" + data + "\",\n")
                    json.write("\t\t\t\"horaInício\": \"" + horaInicial + "\",\n")
                    json.write("\t\t\t\"horaFinal\": \"" + horaFinal + "\",\n")
                    json.write("\t\t\t\"título\": \"" + n + "\",\n")
                    json.write("\t\t\t\"local\": \"" + venue + "\"\n")
                    json.write("\t\t},\n") 

json.write("\t\t{\n") 
json.write("\t\t\t\"desporto\": \"Boxing\",\n")
json.write("\t\t\t\"dia\": \"August 8\",\n")
json.write("\t\t\t\"horaInício\": \"3pm\",\n")
json.write("\t\t\t\"horaFinal\": \"5pm\",\n")
json.write("\t\t\t\"título\": \"TBC\",\n")
json.write("\t\t\t\"local\": \"Kokugikan Arena\"\n")
json.write("\t\t}\n") 
json.write("\n\t]\n") 
json.write("}") 

            