from random import choice

''' 
s: fn fv fn 
 | fn fv
 ;

fn: "O" n 
  | "O" np
  | "Ele"
  ;

np: "Diogo";

n: "gato"
 | "crocodilo"
 ;

fv: "caçou"
  | "viu"
  ;

Exemplo: O gato viu O diogo.
'''

g = {'s': [
    ['fn', 'fv', 'fn'],
    ['fn', 'fv'],
],
    'fn': [
    ["o", "n"],
    ['o', 'np'],
    ['ele'],
],
    'np': [
    ['Diogo'],
],
    'n': [
    ['gato'],
    ['crocodilo'],
],
    'fv': [
    ['caçou'],
        ['viu'],
]
}

def gera(gra : dict, simb : str) -> str:
    # If terminal Then retorna o simb.  
    if simb not in gra:
        return (simb)

    return str.join(' ', [gera(gra, si) for si in choice(gra[simb])])

print(gera(g, 's'))