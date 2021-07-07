grammar ex1;

@members{
         // Inicializacao das variaveis
         int linha=1;
         int tamanho=0;
         int totalNumeros=0;
         int somaNumeros=0;
         int totalPalavras=0;
         int max=0;
         int flag=0;
         int somatorio=0;
         }

listas: lista+
      ;

lista: Lista elementos '.'
       {
        System.out.println("Linha: " + linha + " ********************************************************");
        if (totalNumeros == totalPalavras) {
        
            // a)
            System.out.println("Tamanho da lista: " + tamanho);
            System.out.println("Quantidade de numeros: " + totalNumeros);

            // b) (os *1.0 é para transformar os valores em doubles) 
            double media = somaNumeros*1.0/totalNumeros*1.0;
            System.out.println("Media: " + media);

            // d)
            System.out.println("Maximo: " + max);

            // e)
            System.out.println("Somatorio: " + somatorio);
            
        } else {
            // c)
            System.out.println("Linha invalida (quantidade de palavras =/= quantidade de numeros)");
        }       
        
        // Reset das variaveis para a proxima linha 
        tamanho=0;
        totalNumeros=0;
        somaNumeros=0;
        totalPalavras=0;
        max=0;
        flag=0;
        somatorio=0;
        linha++;
       }
       ;


elementos: elemento       { tamanho=1 ; }
           (',' elemento  { tamanho++ ; })*
           ;

elemento: PALAVRA { totalPalavras++; 
                    if($text.equals("start")) flag=1;
                    if($text.equals("stop")) flag=0; }
        
          |NUM    { totalNumeros++;
                    int num = Integer.parseInt($text);
                    somaNumeros += num;
                    if (num > max) max = num;
                    if (flag==1)  somatorio += num; }
          ;

//LEXER

Lista: [lL][iI][sS][tT][aA]
     ;

NUM: ('0'..'9')+
   ;

PALAVRA: [a-zA-Z][a-zA-Z0-9]*
       ;
WS: ('\r'? '\n' | ' ' | '\t')+ ->skip;