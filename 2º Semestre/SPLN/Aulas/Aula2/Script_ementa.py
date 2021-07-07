#!/usr/bin/python3 
from jjcli import * ### re + getopt + fileinputs + sys + os + subprocess
import random, os, sys

c=clfilter(opt="a")

txt=qx("pdftotext e.pdf -")

#apagar até "Sopa"
txt = sub(r'(.|\n)*?Sopa', r'===Sopa', txt, count=1)
txt = sub(r'\n1 (.|\n)*', r'===Fim', txt, count=1)
txt = sub(r'\n(Acompanhamento [12]|Prato|Sopa)\n', r'===\1===', txt)

lista = split(r'===',txt)
## ig1,*lista,igu=split(...)

lista.pop() ##tirar "FIM"
lista.pop(0) ##tirar ""inicial

menugeral=[]

for g in lista:
    tit,*items=split(r'\n\n+',g) #tit = 1º elemento do split, *item = 2º elemento do split
    menugeral.append((tit,items)) #lista de tuplos

for dia in [0,1,2,3,4]: #segunda a quinta
    print(f"Dia: {dia+2}f\n"}) #+2 para o 0 ser correspondente a 2ª feira
    for tit, its in menugeral:
        print("==",tit,its[dia].strip())


#print(menugeral)
########################################################################################################

## a=[1,2,3,4]
## a.pop(0) --> 1
## a.pop() --> 4
## a[1:-1] --> [2,3] (-1 é a contar do fim basicamente)
## a[::2] --> [1,3] (de 2 em 2)
## a[::-1] --> [4,3,2,1]

## re :
##     str = sub (ER, SS, str)
##     lista = split(ER, str)
##     lista = findall(ER, str)
##     m = search(ER, str)


## ir buscar a ementa: wget -r -l 1 "link"
## buscar pdf ementa: wget 'www.sas.uminho.pt/uploads/Ementa_CantinaGualtar_01%20a%2005%20Mar%C3%A7o.pdf'
## passar para texto: pdftotext -raw Ementa_CantinaGualtar_01\ a\ 05\ Março.pdf   
                           ## sem o raw fica mais legível