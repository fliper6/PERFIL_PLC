<?xml version="1.0" enconding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <!-- (1) Só com isto, seria uma transformação por omissão, i.e., só vai aparecer o texto do poema, as tags desaparecem  -->
    <xsl:output method="html" encoding="UFT-8" indent="yes"/>

    <!-- (3) A página xml tranformada fica vazia porque só escreve o indicado, não faz a travessia pelos filhos-->
    <xsl:template match="/">
        <html>
            <head>
                <title> Poema transformado </title>
            </head>
            <body>
                <!-- (4) Com este comando, já percorres os filhos-->
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>

    <!-- (5) Criar os outros templates para ler o resto do poema -->    
    <xsl:template match="poema">
        <h2> <value-of select="titulo"/> </h2>
        <h3> <value-of select="autor"/> </h3>
        <!-- (7) Aqui, usando o apply-templates só, repetimos o titulo / autor / data. Daí termos de usar o select="corpo" -->
        <xsl:apply-templates select="corpo"/>
        <h4> <value-of select="data"/> </h4>
    </xsl:template>

    <!-- (6) | means or-->
    <xsl:template match="quadra|terceto">
        <div style="display:block; margin:30px">
            <!-- (8) Usar o value-of aqui não resulta muito bem porque depois não vai ler a template do "nome" e não os vai pintar de vermelho 
            </xsl:value-of select="."> -->
            <xsl:apply-templates/>
        </div>
    </xsl:template>

    <xsl:template match="verso">
        <!-- (9) Novamente, como no (8), temos que usar o apply-templates e não o value-of para poder apanhar os nomes, locais, etc -->
        <xsl:apply-templates/>
    </xsl:template>

    <!-- (10) para apanharmos os text nodes a seguir dos versos: verso/text() -->

    <!-- (2) Com isto, já põe os nomes a vermelho-->
    <xsl:template match="nome">
        <span style="color:red">
            </xsl:value-of select="."> 
        </span>
    </xsl:template>

</xsl:stylesheet>