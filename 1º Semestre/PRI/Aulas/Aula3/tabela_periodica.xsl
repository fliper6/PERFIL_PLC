<?xml version="1.0" enconding="UTF-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="html" encoding="UFT-8" indent="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <title> Tabela Periódica dos Elementos </title>
            </head>
            <body>
                <table width="100%" border="1">
                    <tr> <!-- 1 linha -->
                        <td width="30%" valign="top"> <!-- 1º coluna para o índice -->
                            <a name="indice"/> <!--Bookmar (igual ao "id=#indice" no HTML5) -->
                            <h3> Índice </h3> 
                            <ol>
                                <xsl:apply-templates mode="indice" select="//ATOM">
                                    <xsl:sort select="SYMBOL"/>
                                </xsl:apply-templates>
                            </ol>
                        </td>
                        <td> <!-- 2º coluna com o conteúdo -->
                            <xsl:apply-templates select="//ATOM">
                                <xsl:sort data-type="number" select="ATOMIC_NUMBER"/>
                            </xsl:apply-templates>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    </xsl:template>

    <!-- Templates para o índice -->
    <xsl:template match="ATOM" mode="indice">
        <li>
            <!-- <a name="i{generate-id()}"/> >>>>>  EXTRA1: Para voltar para o sítio específico no índice, onde clicamos -->
            
            <a href="#n{ATOMIC_NUMBER}"> <!-- OU <a href="#{generate-id()}"> -->
                <xsl:value-of select="SYMBOL"/>
                -
                <xsl:value-of select="NAME"/>
            </a>
        </li>
    </xsl:template>

    <!-- Templates para o conteúdo -->
    <xsl:template match="ATOM">
        >
        <a name="n{ATOMIC_NUMBER}"/> <!-- maneira para criar o id único  OU <a name="{generate-id()}"/> -->
        <p> <b>Nome</b>: <xsl:value-of select="NAME"/> </p>
        <p> <b>Peso Atómico</b>: <xsl:value-of select="ATOMIC_WEIGHT"/> </p>
        <p> <b>Número Atómico</b>: <xsl:value-of select="ATOMIC_NUMBER"/> </p>
        <xsl:if test="HEAT_OF_FUSION"> <!-- Componente pode ou não existir -->
            <p> <b>Ponto de fusão</b>:
                <xsl:value-of select="HEAT_OF_FUSION"/>
                <xsl:value-of select="HEAT_OF_FUSION/@UNITS"/>
            </p>
        </xsl:if>
        <!-- <adress> [<a href="#i{generate-id()}"> Voltar ao índice </a>] </adress>  >>>>> EXTRA1-->
        <adress> [<a href="#indice"> Voltar ao índice </a>] </adress> <!-- cardinal torna bookmark num índice -->
        <center> <!-- Linha entre cada elemento -->
            <hr width="80%"/>
        </center>
    </xsl:template>

</xsl:stylesheet>