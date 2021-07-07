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
       {HashMap Quants = new HashMap<String,Integer>(); 
        HashMap Prods = new HashMap<String,Float>(); 
        Quants.put($produto.ref, new Integer($produto.quant));
        Prods.put($produto.ref, new Float($produto.prec));}
      (produto
       {Quants.put($produto.ref, new Integer($produto.quant));
        Prods.put($produto.ref, new Float($produto.prec));}
      )*
      (fatura 
       {$totLinha = 0;
        /* Tratamento dos erros */
        $fatura.MapProd.forEach((k, v) -> {
            if (Prods.containsKey(k)) {
                int quantidadeStock  = Integer.parseInt(Quants.get(k).toString()); 
                int quantidadeCompra = Integer.parseInt(v.toString()); 
                
                // Na versão que entreguei tirei este erro para não ficar igual 
                if (quantidadeCompra<=quantidadeStock) {
                    int newStock = quantidadeStock-quantidadeCompra;
                    float preco = Float.parseFloat(Prods.get(k).toString()); 
                    Quants.replace(k, new Integer(newStock));
                    $totLinha += preco*quantidadeCompra;
                    $totGeral += preco*quantidadeCompra;
                }
                else {System.out.println("Erro: Stock insuficiente");}
            }
            else {System.out.println("Erro: Venda com quantidades inexistentes");}
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

fatura returns [int idFatura, HashMap MapProd]
    : FATURA cabecalho VIRGULA corpo PONTO
       {$idFatura  = $cabecalho.idFatura;
        $MapProd = $corpo.MapProd;}
      ;

// Cabeçalho da Fatura -----------------------------------------------------------------------

cabecalho returns [int idFatura]
    : numFatura VIRGULA fornecedor VIRGULA cliente
       {$idFatura = $numFatura.idFatura;}
    ;

/* NOTA: A regra "numFatura" não pode ter o mesmo nome que o value "idFatura" - dá conflito */
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

corpo returns [HashMap MapProd]
    : referencia 
      quantidade 
       {$MapProd = new HashMap<String,Integer>();
        $MapProd.put($referencia.ref, new Integer($quantidade.quant));}     
      (PONTOVIRGULA 
       referencia 
       quantidade 
        {$MapProd.put($referencia.ref, new Integer($quantidade.quant));}
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

