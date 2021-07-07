grammar ex4;
@header {
import java.util.HashMap;
}

//4.2 - Definição Semântica

/* ---------------------------------------------------------------------------------------- */
// Linguagem para Faturacao ---------------------------------------------------------------

lingFaturacao returns [float totGeral, float totLinha]
    
@after{System.out.println("\n" + "Total Geral: " + $totGeral);}
    : produto 
       {HashMap Prods = new HashMap<String,Float>(); 
        Prods.put($produto.ref, new Float($produto.prec));}
      (produto
       {Prods.put($produto.ref, new Float($produto.prec));}
      )*
      (fatura 
       {$totLinha = 0;
        /* Tratamento dos erros */
        $fatura.Map.forEach((k, v) -> {
            if (!Prods.containsKey(k)) {System.out.println("Erro: Produto inexistente");}
        });
        System.out.println("Total da linha " + $fatura.idFatura + ": " + $totLinha + "----------------------------------" + "\n");
       }
      )+
     ;

/* ---------------------------------------------------------------------------------------- */
// Fatura ---------------------------------------------------------------------------------

produto returns[String ref,int quant, float prec]
       : PRODUTO referencia VIRGULA descProduto VIRGULA preco VIRGULA quantidade PONTOVIRGULA 
          {$ref=$referencia.ref;
           $prec=$preco.prec;
           $quant=$quantidade.quant;}
       ;

descProduto : STRING ;

preco returns [float prec]   
      : PRECO 
         {$prec = Float.parseFloat($PRECO.text);}
      ;

/* ---------------------------------------------------------------------------------------- */
// Fatura ---------------------------------------------------------------------------------

fatura returns [int idFatura, HashMap Map]
    : FATURA cabecalho VIRGULA corpo PONTO
       {$idFatura  = $cabecalho.idFatura;
        $Map = $corpo.Map;}
      ;

// Cabeçalho da Fatura -----------------------------------------------------------------------
cabecalho returns [int idFatura]
    : numFatura VIRGULA fornecedor VIRGULA cliente
       {$idFatura = $numFatura.idFatura;}
    ;

numFatura returns [int idFatura]
    : NUM 
       {$idFatura = $NUM.int;}
    ;

fornecedor : LPARENT nome VIRGULA nif VIRGULA morada VIRGULA nib RPARENT ;

cliente : LPARENT nome VIRGULA nif VIRGULA morada RPARENT ;

// Detalhes do Cliente
nome : STRING ;

nif : NUM ;

morada: STRING ;
        
nib : NUM ;

// Corpo da Fatura ---------------------------------------------------------------------------
corpo returns [HashMap Map]
    : referencia 
      quantidade 
       {$Map = new HashMap<String,Integer>();
        $Map.put($referencia.ref, new Integer($quantidade.quant));}     
      (PONTOVIRGULA 
       referencia 
       quantidade 
        {$Map.put($referencia.ref, new Integer($quantidade.quant));}
      )*
    ;



referencia returns [String ref]
           : REF 
              {$ref = $REF.text;}
           ;

quantidade returns [int quant]
           : NUM 
              {$quant = $NUM.int;}
           ;



//4.1 - Definição Sintática

FATURA: [fF][aA][tT][uU][rR][aA];
PRODUTO: [pP][rR][oO][dD][uU][tT][oO];

NUM: [0-9]+; //NIFs, NIB, Quantidade
STRING: [a-zA-Z]+; //Nomes, Descrição, Morada
PRECO: [0-9]+[.][0-9][0-9];
REF: [a-zA-Z0-9]+;

VIRGULA: ',';
PONTO: '.';
PONTOVIRGULA: ';';
LPARENT: '(';
RPARENT: ')';
WS: ('\r'? '\n' | ' ' | '\t')+ ->skip;

