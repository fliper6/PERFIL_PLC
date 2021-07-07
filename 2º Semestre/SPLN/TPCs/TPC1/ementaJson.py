#!/usr/bin/python3 
from jjcli import *
import random, os, sys, json

#TPC: (conversor de PDF para JSON)
##################################

c=clfilter(opt="a")

txt=qx("pdftotext ementa.pdf -")

txt = sub(r'(.|\n)*?Sopa', r'===Sopa', txt, count=1)
txt = sub(r'\n1 (.|\n)*', r'===Fim', txt, count=1)
txt = sub(r'\n(Acompanhamento [12]|Prato|Sopa)\n', r'===\1 \n', txt)

lista = split(r'===',txt)

lista.pop() 
lista.pop(0)

menugeral=[]

for g in lista:
    tit,*items=split(r'\n\n+',g)
    menugeral.append((tit,items))

var = 0
ementa = {}
for dia in [0,1,2,3,4]: 
    diaSemana = {}

    almoco = {}   
    for i in [0,1,2,3]:
        fase = str(menugeral[i][0]).replace('\n',' ').strip()
        almoco[fase] = menugeral[i][1][dia].replace('\n',' ').strip()
        diaSemana["Almoço"] = almoco

    jantar = {}
    for j in [4,5,6,7]:
        fase = str(menugeral[j][0]).replace('\n',' ').strip()
        jantar[fase] = menugeral[j][1][dia].replace('\n',' ').strip()
        diaSemana["Jantar"] = jantar

    var = 0
    diaf = str(dia+2) + 'f'
    ementa[diaf] = diaSemana

##feveras de porco grelhadas\ncom cebolada --> remover \n precisamos do replace
  ## .strip('\n') --> remove '\n' do início e fim da string
  ## .replace('\n',' ') --> remove qualquer '\n' da string 

menuJson = json.dumps(ementa, ensure_ascii=False)
print(menuJson)


