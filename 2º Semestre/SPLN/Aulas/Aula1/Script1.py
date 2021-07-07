#!/usr/bin/python3 

from jjcli import *

c = clfilter() # podemos consultar em "pydoc3 jjcli"
i = j = w = r = 0
for line in c.input():
	w += len(line.split())
	j += len(line) + 1
	i += 1
#for par in paragraph():
#	r+=1
print(i,w,j) 

#v1.0 - python3 Script1.py Script1.py (devolve o número de linhas do próprio ficheiro)
#v2.0 - python3 Script1.py Script1.py =/= wc Script1.py (wc é maior porque conta as new lines)

