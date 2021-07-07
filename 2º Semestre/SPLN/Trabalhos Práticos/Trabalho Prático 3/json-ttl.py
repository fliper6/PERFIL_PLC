import json
import shutil
import os

if os.stat("users.json").st_size != 0: ## Evitar erro no make quando não damos argumentos corretos
    
    ind = open("ontologia.ttl","a",encoding="utf-8") 
    base = open("ontologia-base.ttl","r",encoding="utf-8") 

    shutil.copyfile('ontologia-base.ttl','ontologia.ttl') ## Copia ficheiro base para o final

    with open('users.json',encoding="utf-8") as f:
        data = json.load(f)

    for u in data['users']: ## Povoa com utilizadores

        ind.write("###  http://www.semanticweb.org/filipa/ontologies/2021/5/ontologia#"+ u['username'] +"\n")
        ind.write(":" + u['username'] + " rdf:type owl:NamedIndividual , :Utilizador ;\n")
        if('nome' in u):
            ind.write("     :nome \"" + u['nome'] + "\" ;\n")
        if('organização' in u):
            ind.write("     :organização \"" + u['organização'] + "\" ;\n")
        if('biografia' in u):
            ind.write("     :biografia \"" + u['bio'] + "\" ;\n")
        if('local' in u):
            ind.write("     :local \"" + u['local'] + "\" ;\n")   
        ind.write("     :followers " + u['followers'] + " ;\n")
        if(len(u['repositórios']) == 0):
            ind.write("     :following " + u['following'] + " .\n")
        else:
            ind.write("     :following " + u['following'] + " ;\n")

        j = 0
        if(len(u['repositórios']) > 1): ## mais que 1 rep
            for par in u['repositórios'][:-1]:
                if (j == 0): ## primeiro elemento
                    ind.write('     :criou :' + par.rstrip(".") + ',\n') 
                    j+=1
                else: 
                    ind.write('            :' + par.rstrip(".") + ',\n')
            ind.write('            :' + u['repositórios'][-1].rstrip(".") + '.\n\n') ## último elemento
        elif(len(u['repositórios']) == 1): ## só 1 rep 
            ind.write('   :criou :' + u['repositórios'][0].rstrip(".") + '.\n\n')


        for par in u['repositórios'][:-1]: ## Povoa com repositórios
            ind.write("###  http://www.semanticweb.org/filipa/ontologies/2021/5/ontologia#"+ par.rstrip(".") +"\n")
            ind.write(":" + par.rstrip(".") + " rdf:type owl:NamedIndividual , :Repositório ;\n")
            ind.write("     :título \"" + par + "\" .\n\n")
