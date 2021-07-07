#!/usr/bin/python3

from jjcli import *       
from bs4 import BeautifulSoup as bs 
import requests
from requests.exceptions import ConnectionError

fyaml = open("genealogia.yaml","w+") 

def individual(id, fam, p, doc):
   if(p == 1): print("####### Indivíduo: "+ id +" #######\n")

   ## Variáveis auxiliares
   verif = 0
   verif2 = 0
   verif3 = 0
   verif5 = True
   ids_conjuges = []
   ids_filhos = []
   nr_cas = []
   d = []
   local_data = []
   casam_local = True

   html = requests.get("http://pagfam.geneall.net/3418/pessoas.php?id=" + id) 
   soup = bs(html.text,"html.parser")
   soup_string = str(soup)

   p1, *sec_cont = split(r'<div\s+class="marcadorP".*?>(.*?)</div>', soup_string)
   nome = findall(r'<title>([\w \.\-]+)</title>', p1)

   ## Indivíduo - Nome
   if(nome):
      if(p == 1): print("-- Nome:" + nome[0])
      fyaml.write("\n\nI_"+ id +":\n\tnome : "+ nome[0]) 

   ## Indivíduo - Data de Nascimento
   dataN = findall(r'\*[\w(), ]+<nobr>([0-9.]+)</nobr>', p1)
   if(dataN):
      if(p == 1): print("-- Data de Nascimento: " + dataN[0])
      fyaml.write("\n\tnasc : "+ dataN[0]) 

   ## Indivíduo - Data da Morte
   dataM = findall(r'\+[\w(), ]+<nobr>([0-9.]+)</nobr>', p1)
   if(dataM):
      if(p == 1): print("-- Data da Morte: " + dataM[0])
      fyaml.write("\n\tmorte : "+ dataM[0])
   
   for sec in sec_cont:
      if len(sec) < 30:
         tit = sec
      else:
         familiares = findall(r'<a\s+href=(.*?id=(\d+)"?)>(.*?)</a>', sec)

         if(tit == "Pais"): ###############################################################################
            ids_pais = []
            nomes_pais = []

            for url,idP,nome  in familiares:
               ids_pais.append(idP)
               nomes_pais.append(nome)

            if(p == 1):
               print("--Pais:")
               print("---- Pai:" + nomes_pais[0] + " (" + ids_pais[0] + ")")
               print("---- Mãe:" + nomes_pais[1] + " (" + ids_pais[1] + ")")

            ## Indivíduo - Referência à Família (Pai e Mãe)   
            if((ids_pais[0] in fam) and (ids_pais[1] in fam)):
               if(fam.index(ids_pais[0]) <  fam.index(ids_pais[1])):
                  fyaml.write("\n\tfam : F_"+ ids_pais[0] +"_"+ ids_pais[1])
               else:
                  fyaml.write("\n\tfam : F_"+ ids_pais[1] +"_"+ ids_pais[0])
            elif(ids_pais[0] in fam):
               fyaml.write("\n\tfam : F_"+ ids_pais[0] +"_"+ ids_pais[1]) 
            elif(ids_pais[1] in fam):
               fyaml.write("\n\tfam : F_"+ ids_pais[1] +"_"+ ids_pais[0])
            else:
               fam.append(ids_pais[0])
               fyaml.write("\n\tfam : F_"+ ids_pais[0] +"_"+ ids_pais[1])


         if(tit == "Casamentos"):  ########################################################################

            fyaml.write("\n\tcas : [ ")

            ## Família - Local e Data 
            locais = findall(r'<div\s+align="center">(?:<b>(?:.*?)</b>)?(?:[\s]*)?(.*?)</div>', sec)
            casam = findall(r'<div\s+align="center"><b>(.*?)</b>(?:[\s]*)?(?:.*?)</div>', sec)
            j = 0
            for i in locais:
               local_data_prev = len(local_data)
               local_data.extend(findall(r'(.*?)[\s]*?<nobr>(.*?)</nobr>' , i))
               if (casam):
                  if(len(local_data) == local_data_prev and casam[j] == 'Casamento I:'):
                     casam_local = False
                  j +=1


            if(locais == ['']):
               locais = []

            nr_cas = findall(r'<div\salign="center"><b>(Casamento [I]+):</b>', sec) 

            ## Indivídio - Referência à(s) Família(s) (Cônjuges e Filho) 
            if (p == 1): print("--Cônjuges:")

            nomes_conjuges = []
            loc = 0
            csml = casam_local
            for url,idC,nome  in familiares:
               
               if (p == 1): 
                  if(local_data and csml):
                     print("---- Casou com:" + nome + " (" + idC + ")" + ' em ' + str(local_data[loc][0]) + ' [' + str(local_data[loc][1]) + ']')
                     loc += 1
                  else:
                     print("---- Casou com:" + nome + " (" + idC + ")")
                     csml = True
                  
               ids_conjuges.append(idC)
            
               if(idC in fam): 
                  if (verif == 0): 
                     fyaml.write("F_"+ idC +"_"+ id) 
                     verif = 1
                  else: 
                     fyaml.write(", F_"+ idC +"_"+ id) 
               else:
                  if (verif == 0): 
                     fyaml.write("F_"+ id +"_"+ idC)     
                     verif = 1
                  else: 
                     fyaml.write(", F_"+ id +"_"+ idC) 
            fyaml.write(" ]")
            
         if(tit == "Notas" or tit == "Notas Biográficas"): ################################################
            ## Documentos
            docs = findall(r'(?:<li>(.*?)</li>)', sec)
            fyaml.write("\n\tdocs : [ ")
            if(p == 1): print("--Notas:")
            for docu in docs:
               if(p == 1): print("---- " + docu )
               if(verif5):
                  fyaml.write("D_" + str(doc) + " ")
                  verif5 = False
               else : 
                  fyaml.write(", D_" + str(doc) + " ")
               
               d.append(docu)
               doc += 1
            fyaml.write("]")
            


         filhosPorCasa = []
         
         if(tit == "Filhos"): ##############################################################################

            ## (filhos quando há mais de 1 casamento)
            if(nr_cas): 
               for cas in nr_cas:
                  filhos_cas = findall(r'<b>Filhos do '+cas+r':</b></div>.*?[<li>[\w\W]*?]*?</ul>', sec)
                  if(filhos_cas): 
                     filhos_cas2 = findall(r'id=([0-9]+)', filhos_cas[0]) 
                     filhosPorCasa.append(filhos_cas2)
                  else: 
                     filhos_cas2 = []
                     filhosPorCasa.append(filhos_cas2)

            ## Indivíduo - Filhos
            j = 0
            if(p == 1): print("--Filhos:")
            fyaml.write("\n\tfilhos : [ ")
            for url,idF,nome  in familiares:
               j += 1
               if(p == 1): print("---- Filho " + str(j) + ": "+ nome +" (" + idF + ")")
               ids_filhos.append(idF)
               if (verif2 == 0): 
                  fyaml.write("I_"+ idF) 
                  verif2 = 1
               else: 
                  fyaml.write(", I_"+ idF) 
            fyaml.write(" ]")
         

         else: 
            for cas2 in nr_cas:
               filhosPorCasa.append([]) 
   
   ## Família - Filhos e Cônjugues
   if(ids_conjuges):
      inc = 0
      loc = 0
      for conj in ids_conjuges:
         if(conj not in fam):
            if(id not in fam):
               fam.append(id)

            fyaml.write("\n\nF_"+ id +"_"+ conj + ":\n\tprog1 : "+ id +"\n\tprog2 : "+ conj +"\n\tfilhos : [ ")
 
            if(nr_cas): ## (mais que 1 casamento)
               if(filhosPorCasa[inc]): ## (com filhos)
                  for fil in filhosPorCasa[inc]:
                     if (verif3 == 0): 
                        fyaml.write("I_"+ fil) 
                        verif3 = 1
                     else: 
                        fyaml.write(", I_"+ fil) 
               inc += 1
               verif3 = 0

            else: ## (casamento único)
               if(ids_filhos): ## (com filhos)
                  for fil in ids_filhos:
                     if (verif3 == 0): 
                        fyaml.write("I_"+ fil) 
                        verif3 = 1
                     else: 
                        fyaml.write(", I_"+ fil) 
            fyaml.write(" ]")

            ## Família - Data e Local
            if(local_data and loc < len(local_data) and casam_local):
               if(local_data[loc][1] and local_data[loc][0] != ''):
                  fyaml.write("\n\tlocal : '" + str(local_data[loc][0]) + "'\n\tdata : " + str(local_data[loc][1]))
               elif(local_data[loc][0] != ''):
                  fyaml.write("\n\tlocal : " + str(local_data[loc][0]))
               else:
                  fyaml.write("\n\tdata : " + str(local_data[loc][1]))
               loc += 1
            elif(not casam_local):
               casam_local = True
   
   if (d) :
      doc_id = len(d)
      for docu in d:
         fyaml.write("\n\nD_" + str(doc - doc_id) + ":\n\ttxt : | " + docu)
         doc_id -= 1
   return doc

## MAIN 

id_dado = sys.argv[1]

if (id_dado == "showAll"):
   fam = []
   doc = 1
   for i in range(5):

      html = requests.get("http://pagfam.geneall.net/3418/pessoas_search.php?start=" + str(i*30)) 
      soup = bs(html.text,"html.parser")
      soup_string = str(soup)

      pessoas = findall(r'<a\s+href=(.*?id=(\d+)"?)>(.*?)</a>', soup_string)
      for url,id,nome in pessoas:
         doc = individual(id,fam,0, doc)

else: 
   html = requests.get("http://pagfam.geneall.net/3418/pessoas.php?id=" + id_dado) 
   if("Geneall | Portal de Genealogia" in str(html.text)): 
      print("Pessoa não registada!")
   else:
      individual(id_dado, [],1, 1)

         