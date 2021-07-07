import xml.etree.ElementTree as ET
import codecs
import os

tree = ET.parse('jcrpubs.xml')
root = tree.getroot()
f = codecs.open("jcrpubs-individuals.ttl", "a", "utf-8-sig")

authorNames = []
editorNames = []

def printAut(author,editor):
    i = 0
    if(len(author) > 1): ## mais que um autor
        for par in author[:-1]:
            if (i == 0): ## primeiro elemento
                f.write('   :hasAuthor :' + par + ',\n') 
                i+=1
            else: 
                f.write('              :' + par + ',\n')
        if(len(editor)>1):
            f.write('              :' + author[-1] + ';\n') ## último elemento
        else:
            f.write('              :' + author[-1] + '.\n\n') 
    elif(len(author) == 1): ## só 1 autor
        if(len(editor)>1):
            f.write('   :hasAuthor :' + author[0] + ';\n') 
        else:
            f.write('   :hasAuthor :' + author[0] + '.\n\n') 

def printEdi(editor):
    i = 0
    if(len(editor) > 1): ## mais que um editor
        for par in editor[:-1]:
            if (i == 0): ## primeiro elemento
                f.write('   :editedBy :' + par + ',\n') 
                i+=1
            else: 
                f.write('             :' + par + ',\n')
        f.write('             :' + editor[-1] + '.\n\n') ## último elemento
    elif(len(editor) == 1): ## só 1 editor
        f.write('   :editedBy :' + editor[0] + '.\n\n') 


## 1 publicação
for pub in root:
    j = 0
    k = 0

    authors = []
    editors = []

    f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/jcrpubs#' + pub.attrib['id'] + '\n') #pub.attrib -> atributos da tag
    f.write(':' + pub.attrib['id'] + ' rdf:type owl:NamedIndividual ,\n') 

    f.write('       :' + pub.tag.capitalize() + ',\n')
    f.write('       :Publication;\n')

    for info in pub:

        if info.tag == 'deliverables':
            for link in info:
                f.write('   :' + info.tag + ' "' + link.attrib['url'] + '";\n')


        elif info.tag == 'author' or info.tag == 'author-ref':
            if (info.tag == 'author-ref'):
                authors.append(info.attrib['authorid'])
            elif (info.tag == 'author'):
                authors.append(info.attrib['id'])
                authorNames.append((info.attrib['id'], pub.attrib['id']))  ## põe par author -  pub no array

        elif info.tag == 'editor' or info.tag == 'editor-ref':
            if (info.tag == 'editor-ref'):
                editors.append(info.attrib['authorid'])
            if (info.tag == 'editor'):
                editors.append(info.attrib['id'])
                editorNames.append((info.attrib['id'], pub.attrib['id']))  ## põe par editor -  pub no array

        else:
            f.write('   :' + info.tag + ' "' + info.text + '";\n')
    
    printAut(authors,editors)
    printEdi(editors)

## Autores
for author in root.iter('author'):
    i = 0
    aut = []
    f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/jcrpubs#' + author.attrib['id'] + '\n') 
    f.write(':' + author.attrib['id'] + ' rdf:type owl:NamedIndividual ,\n') 
    f.write('       :Author,\n')
    f.write('       :Person;\n')
    
    for par in authorNames[:-1]: ## verifica que publicações o autor fez
        if par[0] in author.attrib['id']: 
            aut.append(par[1])

    if(len(aut) > 1): ## mais que uma obra
        for par in aut[:-1]:
            if (i == 0): ## primeiro elemento
                f.write('   :authorOf :' + par + ',\n') 
                i+=1
            else: 
                f.write('             :' + par + ',\n')
        f.write('             :' + aut[-1] + ';\n') ## último elemento
    elif(len(aut) == 1): ## só 1 obra
        f.write('   :authorOf :' + aut[0] + ';\n') 

    f.write('   :name "' + author.text + '".\n\n')

## Editores
for editor in root.iter('editor'):
    i = 0
    aut = []
    f.write('###  http://www.semanticweb.org/filipa/ontologies/2021/3/jcrpubs#' + editor.attrib['id'] + '\n') 
    f.write(':' + editor.attrib['id'] + ' rdf:type owl:NamedIndividual ,\n') 
    f.write('       :Editor,\n')
    f.write('       :Person;\n')
    
    for par in editorNames[:-1]: ## verifica que publicações o autor fez
        if par[0] in editor.attrib['id']: 
            aut.append(par[1])

    if(len(aut) > 1): ## mais que uma obra
        for par in aut[:-1]:
            if (i == 0): ## primeiro elemento
                f.write('   :editorOf :' + par + ',\n') 
                i+=1
            else: 
                f.write('             :' + par + ',\n')
        f.write('             :' + aut[-1] + ';\n') ## último elemento
    elif(len(aut) == 1): ## só 1 obra
        f.write('   :editorOf :' + aut[0] + ';\n') 

    f.write('   :name "' + editor.text + '".\n\n')


