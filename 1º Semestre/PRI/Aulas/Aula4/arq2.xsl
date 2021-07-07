<?xml version="1.0" encoding="UTF-8"?>
<!-- Ordenar índice por concelhos, sem repetições, e em cada ter uma lista dos links dos arqueossítios -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="site/index.html">
            
            <html>
                <head>
                    <title>Arqueossítios do NW Português</title>
                </head>
                <body>
                    <h3>Índice de Arqueossítios</h3>
                    <ul>
                        <!-- "not(CONCEL=preceding::CONCEL)" : não percorre filhos já visitados, evitando reptições de concelhos -->
                        <xsl:apply-templates select="//ARQELEM[not(CONCEL=preceding::CONCEL)]">
                            <!-- "normalize-space" : retirar espaços atrás e à frente e, se forem mais palavra, deixa apenas 1 espaço entre cada -->
                            <xsl:sort select="normalize-space(CONCEL)"/> 
                        </xsl:apply-templates>
                    </ul>             
                </body>    
            </html>
            
        </xsl:result-document>
        <xsl:apply-templates select="//ARQELEM" mode="individual"/>
    </xsl:template>

    <xsl:template match="ARQELEM">
        <!-- Precisamos desta variável para depois comparar o CONCEL com o nome do concelho atual -->
        <xsl:variable name="c" select="CONCEL"/>
        <li>
            <xsl:value-of select="CONCEL"/>
            <!-- Para cada concelho, precisamos de visitar os ARQELEMs que lhe pertencem -->
            <ul>
                <xsl:apply-templates select="//ARQELEM[CONCEL=$c]" mode="subindice">
                    <xsl:sort select="normalize-space(IDENTI)"/>
                </xsl:apply-templates>
            </ul>
        </li>
    </xsl:template>
    
    <xsl:template match="ARQELEM" mode="subindice">
        <li>
            <!-- Criar página para cada um dos arqueossítios-->
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template> 

    <!-- Preencher a página de cada arqueossítio -->
    <xsl:template match="ARQELEM" mode="individual">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    <dl>
                        <xsl:for-each select="./*">
                            <dt> <xsl:value-of select="name(.)"/> </dt>
                            <dd> <xsl:value-of select="."/> </dd>
                        </xsl:for-each>  
                    </dl>  
                    <address>
                        [<a href="index.html"> Voltar ao índice </a>]
                    </address>
                </body>    
            </html>
        </xsl:result-document>
    </xsl:template>

</xsl:stylesheet>