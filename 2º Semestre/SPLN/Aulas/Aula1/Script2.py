#!/usr/bin/python3 

from jjcli import *

c = clfilter(opt="a")
ocr = {}
for par in c.paragraph():
	#all = findall(r"\w+", par)
	for w in findall(r"\w+", par):
		ocr[w] = 1 if w not in ocr else ocr[w] + 1
	#print(all)
#print(ocr)
def dict_pp(d):
	#for k in sorted(d): 
		#print(f"{k}: {d[k]}")
	for k,v in sorted(d.items()):
		print(f"{k}: {v}")

def dict_word(d):
	for k,v in sorted(d.items(),key = lambda x: x[0]):
		print(f"{k}: {v}")

def dict_num(d):
	for k,v in sorted(d.items(),key = lambda x: x[1]):
		print(f"{k}: {v}")

if("-a" in c.opt): #com a flag -a, escolhe o modo de ordenação
	dict_num(ocr)
else :
	dict_word(ocr)


#v1.0 python3 Script2.py teste_par.txt teste_par.txt teste_par.txt (conta as ocorrências 3x)
#v2.0 função dict_pp põe display mais limpo
#v3.0 sorted (alfabeticamente)
#v4.0 sorted (duas maneiras)

#sorted(d.items(),key = lambda x:x[0]) //ordena primeiro elemento do par
#sorted(d.items(),key = lambda x:x[1]) //ordena segundo elemento do par