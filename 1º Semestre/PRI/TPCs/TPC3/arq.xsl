<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="site/arq.html">
            
            <html>
                <head>
                    <title>Arqueossítios</title>
                </head>
                <body>
                    <h3>Índice</h3>
                    <ol>
                        <xsl:apply-templates mode="indice" select="//ARQELEM">
                            <xsl:sort select="IDENTI"/>
                        </xsl:apply-templates>
                    </ol>             
                </body>    
            </html>
            
        </xsl:result-document>
        <xsl:apply-templates/>
    </xsl:template>
    
    
    <!-- Templates para o indice -->
    <xsl:template match="ARQELEM" mode="indice">
        <li>
            <a name="i{generate-id()}"/>
            <a href="{generate-id()}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    
    <!-- Templates para o conteudo -->
    <xsl:template match="ARQELEM">
        <xsl:result-document href="site/{generate-id()}.html">
            <html>
                <head>
                    <title><xsl:value-of select="IDENTI"/></title>
                </head>
                <body>
                    
                    <xsl:if test="IMAGEM">
                        <p><b>Imagem</b>: <xsl:value-of select="IMAGEM/@NOME"/></p>
                    </xsl:if>

                    <p><b>Descrição</b>: <xsl:apply-templates select="DESCRI"/></p>
                    
                    <xsl:if test="CRONO">
                        <p><b>Cronologia</b>: <xsl:value-of select="CRONO"/></p>
                    </xsl:if>
                    
                    <xsl:if test="LUGAR!=''">
                        <p><b>Lugar</b>: <xsl:value-of select="LUGAR"/></p>
                    </xsl:if>
                    
                    <p><b>Freguesia</b>: <xsl:value-of select="FREGUE"/></p>
                    
                    <p><b>Concelho</b>: <xsl:value-of select="CONCEL"/></p>
                    
                    <xsl:if test="CODADM">
                        <p><b>Codadm</b>: <xsl:value-of select="CODADM"/></p>
                    </xsl:if>
                    
                    <p><b>Latitude</b>: <xsl:value-of select="LATITU"/></p>
                    
                    <p><b>Longitude</b>: <xsl:value-of select="LONGIT"/></p>
                    
                    <p><b>Altitude</b>: <xsl:value-of select="ALTITU"/></p>
                    
                    <xsl:if test="BIBLIO">
                        <p><b>Bibliografia</b>:</p>
                        <ul><xsl:apply-templates select="BIBLIO"/></ul>
                    </xsl:if>
                    
                    <p><b>Autor</b>: <xsl:value-of select="AUTOR"/></p>
                    
                    <xsl:apply-templates select="DATA"/>
                    
                    <address>
                        [<a href="arq.html#i{generate-id()}">Voltar ao indice</a>]
                    </address>
                </body> 
            </html>
        </xsl:result-document>
    </xsl:template>
    
    
    <xsl:template match="DESCRI">
        <xsl:apply-templates/> 
    </xsl:template>
    
    <xsl:template match="LIGA">
        <u> <xsl:value-of select="."/> </u>
    </xsl:template>
    
</xsl:stylesheet>