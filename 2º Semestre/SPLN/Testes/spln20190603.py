import re
from unidecode import unidecode
from math import floor

## Questão 1 - a)
def count_digits(lista):
    tot = 0
    for n in lista:
        dig = 1
        while n >= 10:
            n = n / 10
            dig += 1
        tot += dig
    print(tot)

#count_digits([1, 5, 14, 28, 1000])

## Questão 1 - b) 

def is_palindrome(ex_str):
    new = re.sub("([.?!, ]+)",'',ex_str)
    new2 = unidecode(new.lower())

    i = 0 
    v = True
    tamanho = len(new2)
    ultimo = 0

    if tamanho%2!=0: ##impar (letra do meio não interessa)
        tamanho -= 1 
        ultimo = tamanho
    else:
        ultimo = tamanho - 1

    while i<(tamanho/2)-1:
        if new2[i]!=new2[ultimo-i]:
            v = False
        i += 1

    print(v)

#is_palindrome("ParraP")
#is_palindrome("Olé! Maracujá, caju, caramelo.")
#s_palindrome("Scripting em PLN")

## Questão 2

#"Eu/PROPESS nunca/ADV almoço/V à/PREP+ART hora/N do/KS almoço/N ./."

#almoço (2): V (1), N (1)
#Eu (1): PROPESS (1)
#nunca (1): ADV (1)
#à (1): PREP+ART (1)
#hora (1): N (1)
#do (1): KS (1)

# Estratégia: 1) findall dos pares ("Eu/PROPESS", "nunca/ADV", etc)
#             2) criar uma lista de pares em que cada par vai ser a palavra e o seu correspondente dict 
#             3) fazer um for pelos pares e povoar essa lista
#             4) formatar para print

