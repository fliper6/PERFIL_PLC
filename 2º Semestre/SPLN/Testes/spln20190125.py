import re

## Questão 1 - a)
def flatten(lista, nova):
    for l in lista:
        if type(l) is list:
            flatten(l,nova)
        else: 
            nova.append(l)
    return nova

#print(flatten([1,[],[range(2,5)],[[["VI"]],["sete"]]],[]))

## Questão 1 - b)
def soma(lista1, lista2):
    nova = []
    for i in range(0, len(lista1)):
        s = lista1[i] + lista2[i]
        elem = (lista1[i],lista2[i],s)
        nova.append(elem)
    print(nova)

#soma([1,3,5],[3,4,5])

## Questão 1 - c)
def count_char_occur(ex_str):
    res = {}
    
    for i in range(0, len(ex_str)-1):
        key = ex_str[i] + ex_str[i+1]
        res[key] = res.get(key, 0) + 1

    print(res)

#count_char_occur('TESTE DE SPLN')

## Questão 2

medidas = ['yard','yards','inch','inches','foot','feet','mile','miles','milha','milhas']

def footnote(ex_str):
    foot = re.findall(r'([0-9]+) ([\w]*)',ex_str)
    for num, med in foot:
        if med in medidas:
            m = 0 
            l = ''
            if ('yard' in med):
                m = 0.91 
                l = 'm'
            elif ('inch' in med):
                m = 2.54
                l = 'cm'
            elif ('foot' in med or 'feet' in med):
                m = 30.5
                l = 'cm'
            elif ('mile' in med or 'milha' in med):
                m = 1.61
                l = 'km'

            num_conv = m*int(num)
            footnote = str(num) + ' ' + med + "\\\\footnote{" + str(num_conv) + ' ' + l + '}'
            new = re.sub(r''+str(num) + ' ' + med, footnote, ex_str)

        print(new)

#footnote("after running 100 yard, they...")

## Questão 3

def tmx():
    f1 = open("xml1.xml", "r", encoding="utf-8")
    f2 = open("xml2.xml", "r", encoding="utf-8")
    xml1 = f1.read()
    xml2 = f2.read()

    file1 = re.findall(r'<tu>[\W]*?<seg xml:lang="([A-Z][A-Z])">([\w\W]*?)<\/seg>[\W]*?<seg xml:lang="([A-Z][A-Z])">([\w\W]*?)<\/seg>[\W]*?<\/tu>',xml1)
    file2 = re.findall(r'<tu>[\W]*?<seg xml:lang="([A-Z][A-Z])">([\w\W]*?)<\/seg>[\W]*?<seg xml:lang="([A-Z][A-Z])">([\w\W]*?)<\/seg>[\W]*?<\/tu>',xml2)

    newXML = ""
    for lg1, frase1, lg2, frase2 in file1:
        frase2S = ' '.join(frase2.split())
        for lg11, frase11, lg22, frase22 in file2: 
            frase11S = ' '.join(frase11.split())
            if(lg2 == lg11 and frase2S == frase11S): ## normalizar espaços 
                newXML = newXML + "<tu>\n<seg xml:lang="+lg1+">"+frase1+"</seg>\n<seg xml:lang="+lg22+">"+frase22+"</seg>\n</tu>\n\n"

    print(newXML)

#tmx()

## Questão 4
def frases(ex_nome, notis):
    res = []
    for n in notis:
        lista = n.split(".")
        for frase in lista:
            if ex_nome in frase:
                res.append(frase)
    print(res)

n = ["Carlo Ancelotti está de volta ao banco do Real Madrid mas, garante o Telegraph, o treinador a regressar poderia ter sido… José Mourinho. Garante o jornal inglês que Florentino Pérez, presidente dos espanhóis e que mantém uma excelente relação com Mourinho, sondou o português há alguns dias a fim de aferir a possibilidade de substituir Zinedine Zidane no comando dos merengues. Tudo isto terá acontecido antes de o italiano dar o ‘sim’ à proposta do Real Madrid. Mourinho, porém, declinou o convite e sublinhou estar «extremamente entusiasmado» com o novo projeto que abraçou na Roma. O português esteve no Santiago Bernabéu entre 2010 e 2013, tendo conseguido quebrar a hegemonia do Barcelona, então de Pep Guardiola: venceu uma La Liga, uma Taça do Rei e uma Supertaça espanhola.",
     "O legado de Aurélio Pereira, o ‘senhor formação’, foi hoje enaltecido por diversas figuras do futebol português, como o antigo futebolista Paulo Futre, o treinador José Mourinho e o presidente do Sporting, Frederico Varandas."]

#frases("José Mourinho",n)

## Questão 4 - b) (igual ao teste spln20190118)

## Questão 5 
def dic_polaridade(pol):
    dic = {}
    lista = pol.split("\n")
    for frase in lista:
        dic[frase.split(" = ")[1]] = frase.split(" = ")[0]
    print(dic)

pol = "0.9 = após a vitória de ontem o ... subiu de divisão \n -0.7 = depois de derrotado ... desceu de divisão"

dic_polaridade(pol)

## Questão 6) (igual ao teste spln20190118)