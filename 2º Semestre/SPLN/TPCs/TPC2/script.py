from random import choice
from random import randint

g = {'cod': [
        ["pessoa", "linguagem", "metodo", "custo"],
    ],
    'pessoa': [
        ["O", "!homens.txt"],
        ["A", "!mulheres.txt"]
    ],
    'linguagem': [
        ["aprendeu", "ling"]
    ],
    'metodo': [
        ["através de", "met", ","]
    ],
    'custo': [
        ["que custou", "#randomizer", "euros."]
    ],
    'ling': [
        ["!linguagens.txt"]
    ],
    'met': [
        ["!metodos.txt"]
    ]
}

def gera(gram: dict, simb : str) -> str:
    if simb not in gram: #simbolos terminais
        if simb[0] == '#':
            return str(randint(10,40))
        elif simb[0] == '!':
            with open(simb.strip("!")) as file:
                return choice([l.strip() for l in file.readlines()])
        else: 
            return (simb)
    return str.join(' ', [gera(gram, s) for s in choice(gram[simb])])

print(gera(g,'cod'))