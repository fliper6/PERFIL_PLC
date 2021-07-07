from jjcli import *
import re
import unidecode
import sys

def decapitalize(s):
    if not s:  # check that s is not empty string
        return s
    return s[0].lower() + s[1:]

def load_names_and_emails(filename: str) -> [(str,str)]:
    resultado = []
    with open(filename, 'r', encoding='utf-8') as f:
        for linha in f:
            linha = linha.strip()
            if search(r'::', linha):
                nome,email = split(r'\s*::\s*', linha)
                resultado.append((nome,email))
    return resultado


def email_to_nome(data: [(str,str)]) -> [str]:
    resultado = []
    for nome in data:
        ##Caso 1: abelha, paula, helena, etc.
        if(email.capitalize() in unidecode.unidecode(nome[0])): 
            resultado.append(nome[0])
            done.append(nome[0])
            break

        ##Caso 2: jcr, psong, osg, etc.
        sepNomes = nome[0].split(" ")
        sigla = []
        for n in sepNomes:
            if(not n.islower()): ## descartar os "de", "dos", etc
                sigla.append(n[0]) ## vai guardar a primeira letra de todos os nomes
        i = 0

        for s in sigla:
            if unidecode.unidecode(s) == email[i].capitalize(): 
                i+=1
                if i > len(email) - 1:
                    break 

        if i == len(email):
            if(nome[0] not in done): 
                resultado.append(nome[0])
                done.append(nome[0])
                break
        
        ##Caso 3: mrocha, valves, psantos, etc.
        if(decapitalize(unidecode.unidecode(sepNomes[-1])) in email and (unidecode.unidecode(sigla[0]).lower() == email[0] or unidecode.unidecode(sigla[1]).lower() == email[0])):
            if(nome[0] not in done): 
                resultado.append(nome[0])
                done.append(nome[0])
                break
        
        ##Caso 4: Jose.campos
        sepEmail = email.split(".")
        for n in sepNomes:
            for n1 in sepEmail:
                if(n1 in decapitalize(unidecode.unidecode(n))):
                    if(nome[0] not in done): 
                        resultado.append(nome[0])
                        done.append(nome[0])
                        break

        ##Caso 5: jmac
        if(decapitalize(sigla[0]) == email[0] and email[1:] in decapitalize(unidecode.unidecode(sepNomes[-1]))):
            if(nome[0] not in done): 
                resultado.append(nome[0])
                done.append(nome[0])
                break

    return resultado

done = [] ## nomes já percorridos
data = []
data = load_names_and_emails("nomes.txt")
email = sys.argv[1]
## MAIN
if("all" in email):
    f = open("output.txt", "a", encoding="utf-8")
    for nome_email in data: ## para todos os emails
        email = nome_email[1]
        resultados = email_to_nome(data)
        if(resultados):
            f.write(str(resultados[0]) + " :: " + email + '\n')
        else:
            f.write("not found" + " :: " + email + '\n')
elif(email):
    resultados = email_to_nome(data)
    print(resultados)
else:
    print("Email fornecido inválido.")
