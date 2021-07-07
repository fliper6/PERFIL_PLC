<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="w3.org/1999/XSL/Transform"

  xmlns:xd="oxygenxml.com/ns/doc/xsl"

  exclude-result-prefixes="xd"

  version="1.0">

  <xd:doc scope="stylesheet">

    <xd:desc>

      <xd:p><xd:b>Created on:</xd:b> Mar 1, 2021</xd:p>

      <xd:p><xd:b>Author:</xd:b> jcr</xd:p>

      <xd:p>Conversão do mapa de XML para TTL</xd:p>

    </xd:desc>

  </xd:doc>

  

  <xsl:output method="text" encoding="UTF-8" indent="yes"/>

  

  <xsl:template match="cidade">

    ### di.uminho.pt/prc2021/mapa#<xsl:value-of select="@id"/>

    :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,

    :Cidade ;

    :descrição "<xsl:value-of select="descricao"/>" ;

    :distrito "<xsl:value-of select="distrito"/>" ;

    :nome "<xsl:value-of select="nome"/>" ;

    :população <xsl:value-of select="populacao"/> .

    # -------------------------------------------

  </xsl:template>

  

  <xsl:template match="ligacao">

    ### di.uminho.pt/prc2021/mapa#<xsl:value-of select="origem/@cidade"/>-<xsl:value-of select="destino/@cidade"/>

    :<xsl:value-of select="origem/@cidade"/>-<xsl:value-of select="destino/@cidade"/> rdf:type owl:NamedIndividual ,

    :Ligação ;

    :temDestino :<xsl:value-of select="destino/@cidade"/> ;

    :temOrigem :<xsl:value-of select="origem/@cidade"/> ;

    :distância <xsl:value-of select="distancia"/> .

    # --------------------------------------------------

  </xsl:template>

  

</xsl:stylesheet>