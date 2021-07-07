#!/usr/bin/python3 
#from jjcli import * ### re + getopt + fileinputs + sys + os + subprocess
import random, os, sys

disc = sys.argv[1] ##spln
file = f'{os.environ["HOME"]}/SPLN/Aula2/{disc}'   

with open(file) as f:
	alunos = f.readlines()                      ##podiamos ter usado f.readline(), read(), ...

print(random.choice(alunos).strip())	    	##strip remove \s (esq - lstrip() ,dir - rstrip())
## ou print(str.strip(random.choice(alunos))

##correr: python3 Randomizer.py alunos.txt