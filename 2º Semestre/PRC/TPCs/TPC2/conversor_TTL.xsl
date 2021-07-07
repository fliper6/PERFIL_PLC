<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xs:doc scope="stylesheet">    
        <xs:desc>     
            <xs:p><xs:b>Created on:</xs:b> Mar 7, 2021</xs:p> 
            <xs:p><xs:b>Author:</xs:b> Filipa Santos</xs:p>
            <xs:p>Conversão do "arquivo-musica-digital.xml" para TTL</xs:p>
        </xs:desc>   
    </xs:doc>
    
    <xsl:output method="text" encoding="UTF-8" indent="yes"/>
    
    <!-- Obra (Classe) -->
    <xsl:template match="obra">    
        ### http://www.di.uminho.pt/prc2021/tpc2PRC#obra_<xsl:value-of select="@id"/>
        :obra_<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Obra ;
        
        <!-- Título -->
        :titulo "<xsl:value-of select="titulo"/>" ;
        
        <!-- Subtítulo -->
        <xsl:if test="subtitulo">:subtitulo "<xsl:value-of select="subtitulo"/>" ; </xsl:if> 
        
        <!-- Informação Relacionada -->
        <xsl:if test="inf-relacionada">:inf-relacionada "<xsl:value-of select="inf-relacionada/video/@href"/>" ; </xsl:if> 
        
        <!-- Arranjo -->        
        <xsl:if test="arranjo">:arranjo "<xsl:value-of select="arranjo"/>" ; </xsl:if>
        
        <!-- Editado --> 
        <xsl:if test="editado">:editado "<xsl:value-of select="editado"/>" ; </xsl:if>
        
        <!-- Tipo -->
        :tipo "<xsl:value-of select="tipo"/>" .
       
        <!-- Compositor (Classe) --> 
        <xsl:if test="compositor">
            ### http://www.di.uminho.pt/prc2021/tpc2PRCl#compositor_<xsl:value-of select="replace(translate(normalize-unicode(compositor, 'NFKD'),' ',''),'\P{IsBasicLatin}','')"/>
            :compositor_<xsl:value-of select="replace(translate(normalize-unicode(compositor, 'NFKD'),' ',''),'\P{IsBasicLatin}','')"/> rdf:type owl:NamedIndividual ,
            :Compositor ;
            
            <!-- Nome --> 
            :nome "<xsl:value-of select="compositor"/>" ;
            
            <!-- Compôs (Relação) -->
            :compos :obra_<xsl:value-of select="@id"/> .
            
        </xsl:if>
          
        <!-- Instrumento (Classe) --> 
        <xsl:for-each select="instrumentos/instrumento">
            ### http://www.di.uminho.pt/prc2021/tpc2PRC#instrumento_<xsl:value-of select="replace(translate(normalize-unicode(designacao, 'NFKD'),' ',''),'\P{IsBasicLatin}','')"/>
            :instrumento_<xsl:value-of select="replace(translate(normalize-unicode(designacao, 'NFKD'),' ',''),'\P{IsBasicLatin}','')"/> rdf:type owl:NamedIndividual,
            :Instrumento ;
            
            <!-- Designação -->
            :designacao "<xsl:value-of select="designacao"/>" ;

            <!-- Tocado em (Relação) -->
            :tocadoEm :obra_<xsl:value-of select="../../@id"/> .
            
            <!-- Partitura (Classe) --> 
            <xsl:for-each select="partitura">
                ### http://www.di.uminho.pt/prc2021/tpc2PRC#partitura_<xsl:value-of select="@path"/>
                :partitura_<xsl:value-of select="@path"/> rdf:type owl:NamedIndividual ,
                :Partitura ;
                
                <!-- Relativo a (Relação) -->
                :relativoA :instrumento_<xsl:value-of select="replace(translate(normalize-unicode(designacao, 'NFKD'),' ',''),'\P{IsBasicLatin}','')"/> ;
                
                <!-- Afinação / Clave / Voz -->
                :path "<xsl:value-of select="@path"/>" ;
                <xsl:if test="@afinacao">:afinacao "<xsl:value-of select="@afinacao"/>" ; </xsl:if>          
                <xsl:if test="@clave">:clave "<xsl:value-of select="@clave"/>" ; </xsl:if>
                <xsl:if test="@voz">:voz "<xsl:value-of select="@voz"/>" ; </xsl:if> 
                :type "<xsl:value-of select="@type"/>" .
                
            </xsl:for-each>
            
        </xsl:for-each>
        
    </xsl:template>
    
</xsl:stylesheet>