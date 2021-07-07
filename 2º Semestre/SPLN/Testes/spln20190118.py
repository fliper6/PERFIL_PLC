import re
from typing import Collection 
import random

## Questão 1 - a)
def max_diff(ex_ints):
    dif = []
    for n in ex_ints:
        for n2 in ex_ints:
            dif.append(abs(n - n2))

    max = 0
    for n in dif:
        if n > max:
            max = n

    print(max)

#max_diff([1,1,3,5,2])

## Questão 1 - b)
def count_char_occur(ex_str):
    res = {}
    
    for keys in ex_str:
        res[keys] = res.get(keys, 0) + 1

    for a in res:
        if(a != " "): ## ignorar espaços
            print (a + " : " + str(res[a]) + "\n")

#count_char_occur("TESTE DE SPLN")

## Questão 2

def fix_lines(ex_str):
    new = re.sub("[-]+[^\n]\n[^\n]", '',ex_str) ## entre a mesma palavra
    new2 = re.sub("[^\n]\n[^\n]", ' ',new) ## entre palavras diferentes
    print(new2)
    
#fix_lines("Ele mesmo costumava dizer que \n era simplesmente um egoísta: mas \n nunca, como agora na velhice, as \n generosidades do seu coração ti- \n nham sido tão profundas e largas. \n\n Parte do seu rendimento ia-se- \n -lhe por entre os dedos, espar- \n samente, numa caridade enterne- \n cida.")

## Questão 3 - a)
def upper_case(letter):
    print(letter)
    return str(letter.group(0).upper())

def fix_sent_start(ex_str):
    new = re.sub("[.?!]+[\w\W]*?([a-z])",upper_case,ex_str) ## entre a mesma palavra
    print(new[0].upper() + new[1:])
    ## [1:] - tudo menos primeiro char
    ## [-1:] - apenas último char
    ## [:-1] - tudo menos último char
    ## [:1] - apenas primeiro char

tmin = "sou uma frase. peepo pog wow. les go. \n\nparagrafo? who?"
fix_sent_start(tmin)

## Questão 3 - b)

def fix_start_stats(ex_str):
    counts = dict()
    words_nice = re.findall(r'\W?([\w]*)\W?', ex_str)

    for w in words_nice:
        if w != "":
            if w in counts:
                counts[w] += 1
            else:
                counts[w] = 1
    
    for k in sorted(counts):
        print("%s: %s" % (k, counts[k]))

tg = "Eu sou  Filipa Santos. Vivo com o Rui Santos."
#fix_start_stats(tg)

## A partir da análise de um grande texto (tg) com vários nomes próprios, siglas, etc, poderiamos ver quais palavras ocorriam mais vezes com letra maiúscula e, a partir desta informação, 
## poríamos essas mesmas palavras que aparecem em tmin com maiúscula também. 

## Questão 4 

def lookup_noticias(nome, dic, notis):
    words = []
    for n in notis:
        word1 = re.findall(r'\W?([\w]*)\W?', n)
        words = words + word1

    nomes = nome.split(" ")

    ocurrencias = 0
    palavras_surround = []
    indice = 0
    for w in words:
        for n in nomes: ##vai apanhar tanto "José" como "Mourinho" separadamente
            if n in w:
                ocurrencias +=1
                for x in range(1, 6): ##para cada ocurrência, vai buscar as palavras 5 posições antes e 5 depois, se existirem
                    if words[indice-x]: ##verifica se existe
                        palavras_surround.append(words[indice-x])
                    if words[indice-x]: ##verifica se existe
                        palavras_surround.append(words[indice+x])
        indice+=1
    
    ## a)
    pal_10 = random.sample(palavras_surround, 10)
    print(pal_10) ##vai buscar 10 palavras aleatórias
    
    somatório = 0
    for p in pal_10:
        if p in dic: ## nem todas as palavras estão no dicionário
            somatório += dic[p]
        else: ## se a palavra não existir, assumimos como neutra
            somatório += 0

    ## b)
    popularidade = somatório / ocurrencias 
    print(popularidade)

n = ["Carlo Ancelotti está de volta ao banco do Real Madrid mas, garante o Telegraph, o treinador a regressar poderia ter sido… José Mourinho. Garante o jornal inglês que Florentino Pérez, presidente dos espanhóis e que mantém uma excelente relação com Mourinho, sondou o português há alguns dias a fim de aferir a possibilidade de substituir Zinedine Zidane no comando dos merengues. Tudo isto terá acontecido antes de o italiano dar o ‘sim’ à proposta do Real Madrid. Mourinho, porém, declinou o convite e sublinhou estar «extremamente entusiasmado» com o novo projeto que abraçou na Roma. O português esteve no Santiago Bernabéu entre 2010 e 2013, tendo conseguido quebrar a hegemonia do Barcelona, então de Pep Guardiola: venceu uma La Liga, uma Taça do Rei e uma Supertaça espanhola.",
     "O legado de Aurélio Pereira, o ‘senhor formação’, foi hoje enaltecido por diversas figuras do futebol português, como o antigo futebolista Paulo Futre, o treinador José Mourinho e o presidente do Sporting, Frederico Varandas."]
d = { "Sporting": 0.5, "treinador": 0.1, "regressar": -0.1, "jornal": -0.2, "inglês": 0 }

#lookup_noticias("José Mourinho",d,n)

## Questão 5

def find_corresp(texto1,texto2):
    dic = {}
    t1_p = re.findall(r'\W?([\w]*)\W?', texto1)
    t2_p = re.findall(r'\W?([\w]*)\W?', texto2)
    
    for x in range(0, len(t1_p) - 1):
        if t1_p[x] != t2_p[x]:
            dic[t1_p[x]] = t2_p[x]

    print(dic)

t1 = "As inundações provocaram graves damnos na pharmácia. A Philipa foi vítima desses damnos."
t2 = "As inundações provocaram graves danos na farmácia. A Filipa foi vítima desses danos."

#find_corresp(t1,t2)

## Questão 6

## como os returns que o estão no ex do teste dão erro, pus uma função que dá return à mesma 
accoes = [
    (r'És um (\w+)', [ ## expressão regular
        lambda x: f1(x), ## ação
        lambda x: f2(x), ## ação
        'Quem diz é quem é!' ## constante
    ]),
    (r'(\w+) em inglês', [
        lambda x: tradutor(x) ]
    )
]

def f1(x):
    print(x + " és tu!")

def f2(x):
    print("Tu é que és " + x)

dic_pt_en = { "carro" : "car", "livro" : "book", "sapato" : "shoe"}

## a)
def tradutor(x):          
    print(dic_pt_en[x.lower()])

## b) 
def bot_responde(accoes, ex_str):
    for (acc, f) in accoes:
        if re.match(acc, ex_str): ## ação correta
            newString = re.findall(acc, ex_str)[0]
            action = random.choice(f) ## escolhe um randomly 
            if callable(action): ## ação
                action(newString)
            else: ## constante
                print(action)    

#bot_responde(accoes, "Carro em inglês")
#bot_responde(accoes, "És um burro")