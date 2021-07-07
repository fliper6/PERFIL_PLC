#!/usr/bin/python3

from jjcli import *       
from bs4 import BeautifulSoup as bs 
import requests
import time
from requests.exceptions import ConnectionError

json = open("users.json","w",encoding="utf-8") 
counter = 0 
users = []

def addCounter(user):
     global counter
     global users

     counter = counter + 1
     users.append(user)

     return counter

def individual(user, nivel, max, pag):
    
    if max != "No":
        if int(max) == counter:
            print("\n################################")
            print("Limite de utilizadores atingido!")
            print("################################\n")
            json.write("\n\t]\n") 
            json.write("}") 
            if counter > 1: 
                print("\n###################################################")
                print("Foram registados " + str(counter) + " utilizadores!")
                print("###################################################\n")
            else: 
                print("\n##############################################")
                print("Foi registado " + str(counter) + " utilizador!")
                print("##############################################\n")
            exit()

    if counter % 20 == 0: ## a cada 20 utilizadores, para 10 segundos
        time.sleep(10)

    if counter == 0: ## 1º user
        json.write("\t\t{\n") 
    else:
        json.write(",\n\t\t{\n") 

    ## Username + name
    nome = findall(r'<title>(.*?) (\(.*?\))* .*?<\/title>', pag)
    if (nome == []): ## não tem nome definido, só username
        nome = findall(r'<title>(.*?) .*?<\/title>', pag) 
        json.write("\t\t\t\"username\": \"" + nome[0] + "\",\n")

    else: 
        json.write("\t\t\t\"username\": \"" + nome[0][0] + "\",\n") 
        json.write("\t\t\t\"nome\": \"" + nome[0][1].strip('(').strip(')') + "\",\n") 
    
    ## Bio
    bio = findall(rf'<\/title>\n<meta content="([\w\W]*?) {user}[\w\W]*? name="description"\/>', pag)
    if(bio):
        bio1 = ' '.join(bio[0].split()) 
        json.write("\t\t\t\"bio\": \"" + bio1[:-1].rstrip(' ') + "\",\n")

    ## Organização
    org = findall(r'<li aria-label="Organization: (.*?)"', pag)
    if(org):
        json.write("\t\t\t\"organização\": \"" + org[0].rstrip(' ') + "\",\n")

    ## Local
    loc = findall(r'<li aria-label="Home location: (.*?)"', pag)
    if(loc):
        json.write("\t\t\t\"local\": \"" + loc[0].rstrip(' ') + "\",\n")
    
    ## Followers / Following
    fol = findall(r'primary">([0-9]*[a-z]*?)<[\w\W]*?follower[a-z]*?\n<\/a>[\w\W]*?=following"[\w\W]*?>([0-9]*?)<', pag)
    if(fol[0][0][-1] == 'k'): ## milhar
        n = fol[0][0][:-1] + "000"
        json.write("\t\t\t\"followers\": \"" + n + "\",\n")
    else:
        json.write("\t\t\t\"followers\": \"" + fol[0][0] + "\",\n")

    if(fol[0][1][-1] == 'k'): ## milhar
        n = fol[0][1][:-1] + "000"
        json.write("\t\t\t\"following\": \"" + n + "\",\n")
    else:
        json.write("\t\t\t\"following\": \"" + fol[0][1] + "\",\n")

    ## Repositórios
    html = requests.get("https://github.com/"+ user + "?tab=repositories") 
    soup1 = bs(html.text,"html.parser")
    soup_string1 = str(soup1)

    reps = findall(rf'<a href="\/{user}\/(.*?)" itemprop="name codeRepository">', soup_string1)
    json.write("\t\t\t\"repositórios\": [")
    if reps == []: ## não tem repositórios
        json.write(" ]\n")      
    else: 
        for r in reps:
            if (r == reps[-1:][0]): ## último
                json.write("\"" + r.rstrip(' ') + "\"]\n")       
            else:
                json.write("\"" + r.rstrip(' ') + "\", ")
    
    json.write("\t\t}") 
    addCounter(user)

    ############# Following (filhos)

    if int(nivel) > 0:
        html = requests.get("https://github.com/"+ user + "?tab=following") 
        soup2 = bs(html.text,"html.parser")
        soup_string2 = str(soup2)
        
        segs = findall(r'pl-1">(.*?)<', soup_string2)

        for s in segs:
            if(s not in users): ## evitar repetidos
                html = requests.get("https://github.com/" + s) 
                soup3 = bs(html.text,"html.parser")
                soup_string3 = str(soup3)

                if "You have triggered an abuse detection mechanism." in soup_string3: ## limite de requests do Github
                    print("\n#############################")
                    print("Limite de requests do Github!")
                    print("#############################\n")
                    json.write("\n\t]\n") 
                    json.write("}") 
                    if counter > 1: 
                        print("\n###################################################")
                        print("Foram registados " + str(counter) + " utilizadores!")
                        print("###################################################\n")
                    else: 
                        print("\n##############################################")
                        print("Foi registado " + str(counter) + " utilizador!")
                        print("##############################################\n")
                    exit()
                else:
                    individual(s,nivel-1,max,soup_string3)

## MAIN ###############################################################################################################

if(len(sys.argv) == 4):
    user = sys.argv[1]
    nivel = sys.argv[2]
    max = sys.argv[3]

    html = requests.get("https://github.com/" + user) 
    soup = bs(html.text,"html.parser")
    soup_string = str(soup)

    if ("Not Found" in soup_string): ## Utilizador inválido
        print("\n####################")
        print("Utilizador inválido!")
        print("####################\n")

    elif (not nivel.isnumeric()): ## Nível inválido (não é inteiro)
        print("\n###############")
        print("Nível inválido!")
        print("###############\n")

    elif (not max.isnumeric() and max != "No"): ## Máximo inválido (não é inteiro ou a string "No")
        print("\n######################")
        print("Valor máximo inválido!")
        print("######################\n")
    
    else: 
        print("\nProcesso iniciado ...\n")
        json.write("{\n") 
        json.write("\t\"users\": [\n")
        individual(user,int(nivel),max,soup_string)
        json.write("\n\t]\n") 
        json.write("}") 
        if counter > 1: 
            print("\n###################################################")
            print("Foram registados " + str(counter) + " utilizadores!")
            print("###################################################\n")
        else: 
            print("\n##############################################")
            print("Foi registado " + str(counter) + " utilizador!")
            print("##############################################\n")
else:       
    print("\n#######################################################################################")
    print("Insira o nome do utilizador, o nível de profundidade da pesquisa e o máximo pretendido!")
    print("#######################################################################################\n")