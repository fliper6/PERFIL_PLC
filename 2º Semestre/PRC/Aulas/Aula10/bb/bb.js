/* @author José Luís dos Santos Costa <jlsantos@aeiou.pt>
	 @date 15/07/2001
	O resultado do processamento bb.xml/bb.xsl é um frameset com dois frames,
	um relativo a tabela de conteudo (frame[0], no lado esquerdo), outro
	contendo o bulario bracarense propriamente dito (frame[1], no lado direito).

*/

autoreload = false		// a frame[0] é (true) ou não (false) refrescada aqd do processo de construcao do toc
frameset_done = false	// o frameset esta (true) ou nao (false) construido
showprogress = true		// Altera (true) ou nao (false) o valor de defaultStatus aqd ao longo do processamento
tableOfContents = "<HTML>\n" + '<META content="text/html" charset="ISO-8859-1" http-equiv="Content-Type"/>' +
									"\n" + '<LINK rel="stylesheet" type="text/css" href="bbtoc.css" />\n' + '<BODY>\n'

function stylize (style, something) { return '<' + style + '>' + something + '</' + style + '>' + "\n" }

// Funcao invocada ao longo do processamento XML/XSL e que vai colocando
// ancoras no frame[1] que serao posteriormente referenciadas a partir do toc (frame[0]).
function toc (style, content, aname) {
	document.writeln ('<A NAME="' + aname + '">' + content + '</A>')
	parent.tableOfContents += '<' + style + '>' +
														'<A HREF="#' + aname + '" TARGET="bbcts">' + content + '</A>' +
														' </' + style + '>' + "\n"
	if (autoreload == true)		{ top.frames[0].location="javascript:parent.tableOfContents" }
	if (showprogress == true)	{
		defaultStatus = "Processando " + ((content.match (/^[0-9]+$/g) != null) ? 'bula ' : '') + content + "..."
	}
}

// Finaliza codigo HTML do toc
function tocEnd () { tableOfContents += '</BODY>\n</HTML>\n' }

credits =
'<HTML>' +

'<HEAD>' +
'<TITLE>' +
'Bul&#225;rio Bracarense - Cr&#233;ditos' +
'</TITLE>' +
'</HEAD>' +
'' +
'<META content="text/html" charset="ISO-8859-1" http-equiv="Content-Type"/>' +
'<META name="Author Name" content="Santos, Jos&#233; Lu&#237; <jlsantos@aeiou.pt>"/>' +
'<META name="Author Email" content="jlsantos@aeiou.pt"/>' +
'' +
'<LINK rel="stylesheet" type="text/css" href="bbtoc.css"/>' +
'' +
'<BODY>' +
'' +
'<A HREF="javascript:parent.tableOfContents" TARGET="_self">Voltar ao &#205;ndice</A>' +
'' +
'<H1>Cr&#233;ditos</H1>' +
'' +
'<P>' +
'A publica&#231;&#227;o electr&#243;nica do Bul&#225;rio Bracarense - Sum&#225;rios de Diplomas ' +
'Pontif&#237;cios dos S&#233;culos XI a XIX - desenvolveu-se no &acirc;mbito da disciplina ' +
'Op&#231;&#227;o III (Projecto) do 5º ano da ' +
'<A HREF="http://www.di.uminho.pt/lesi/" TARGET="_blank">Licenciatura em Engenharia de Sistemas e Inform&#225;tica</A> ' +
'na <A HREF="http://www.uminho.pt" TARGET="_blank">Universidade do Minho</A>. ' +
'</P>' +
'' +
'<P>' +
'Este projecto, da autoria de ' +
'<A HREF="mailto:jlsantos@aeiou.pt">Jos&#233; Lu&#237;s Santos</A>, ' +
'foi supervisionado pelo prof. ' +
'<A HREF="mailto:jcr@di.uminho.pt">Jos&#233; Carlos Ramalho</A> ' +
'e teve a colabora&#231;&#227;o da Drª ' +
'<A HREF="mailto:clara@adb.uminho.pt">Clara Sofia Moreira</A>, ' +
'do <A HREF="http://www.adb.pt" TARGET="_blank">Arquivo Distrital de Braga</A>. ' +
'</P>' +
'' +
'<P>' +
'A obra que aqui se apresenta &#233; uma edi&ccedil;&#227;o ' +
'esgotada do <A HREF="http://www.adb.pt" TARGET="_blank">ADB</A> ' +
'e cuja exist&#234;ncia se resume a 1000 exemplares que aquela institui&#231;&#227;o det&#233;m, ' +
'resultantes de uma tiragem efectuada em 1986. ' +
'Por esta raz&#227;o, e pelo seu valor historico-cultural reconhecido, ' +
'a publica&#231;&#227;o on-line do <I>Bul&#225;rio Bracarense</I> reveste-se ' +
'de import&#226;ncia acrescida, quebrando quaisquer restri&#231;&#245;es de acesso ' +
'ou de disponibilidade espacio-temporal. ' +
'</P>' +
'' +
'<P>' +
'Que a informa&#231;&#227;o aqui disponibilizada sirva de elemento &#250;til ' +
'para potenciais investigadores deste tema, ou deste per&#237;odo ' +
'da Hist&#243;ria, e que este tipo de iniciativas se continue a promover. ' +
'</P>' +
'' +
'<TABLE BORDER="0">' +
'<TR><TD><A HREF="mailto:jlsantos@aeiou.pt">Santos</A></TD></TR>' +
'<TR><TD>Braga, Setembro de 2000.</TD></TR>' +
'</TABLE>' +
'' +
'<P></P>' +
'<A HREF="javascript:parent.tableOfContents" TARGET="_self">Voltar ao &#205;ndice</A>' +
'' +
'</BODY>' +
'</HTML>'
