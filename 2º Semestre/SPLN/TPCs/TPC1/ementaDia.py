#!/usr/bin/python3 
from jjcli import *
import random, os, sys

#TPC: (p.e., "ementa 2F" mostra a ementa de 2ª feira apenas)
############################################################

c=clfilter(opt="a")

d=sys.argv[1]

if (d!="2f" and d!="3f" and d!="4f" and d!="5f" and d!="6f"):
    print ("**** Dia da semana inválido ****")
    sys.exit()


txt=qx("pdftotext ementa.pdf -")

txt = sub(r'(.|\n)*?Sopa', r'===Sopa:', txt, count=1)
txt = sub(r'\n1 (.|\n)*', r'===Fim', txt, count=1)
txt = sub(r'\n(Acompanhamento [12]|Prato|Sopa)\n', r'===\1: \n', txt)

lista = split(r'===',txt)

lista.pop() 
lista.pop(0)

menugeral=[]

for g in lista:
    tit,*items=split(r'\n\n+',g)
    menugeral.append((tit,items)) 

var = 0
for dia in [0,1,2,3,4]: 
    if (dia == int(d[0])-2): ## d[0] é 6 de "6f" 
        print(f"\n ****** Ementa do dia: {dia+2}ºfeira ****** \n") 
        for tit, its in menugeral:
            if(var == 0): print("==== Almoço:\n")
            if("Sopa" in tit): var+=1
            if(var == 2): 
                print("\n==== Jantar:\n") 
                var+=1
            print("==",tit,its[dia].strip())

