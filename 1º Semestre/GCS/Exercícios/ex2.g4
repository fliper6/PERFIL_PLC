/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

grammar notas;

turmas: turma+;

turma /* returns [int totalAlunos] */
/*@after { System.out.println("Total Alunos:" + $totalAlunos);}
    alunos { $totalAlunos = $alunos.totalAlunos; } */
        :TURMA ID 
        alunos {
                System.out.println("Total Alunos:" + $alunos.totalAlunos);
               }
        PONTO;

/*
alunos: aluno (PONTOVIRGULA aluno)*
      ;
*/
alunos returns [int totalAlunos]:
        aluno      {$totalAlunos = 1;}
        (
        PONTOVIRGULA aluno {$totalAlunos +=1;}
        )*;

/* notas herdar nome : nome notas[$nome.text] e depois .. notas[String n] returns .. */
aluno: nome notas[$nome.text] {
                   float media = $notas.soma / $notas.totalNotas;
                   System.out.println("A média do/a " + $nome.text + " é " + media);
                   }
    ;

nome: NOME
    ;

notas[String nomeA] returns [int soma, int totalNotas]: 
     LP n1=NUM {$soma = $n1.int; $totalNotas = 1;
                if (!($n1.int > 0 && $n1.int < 20))
                System.out.println("Nota OUT OF RANGE");
                }
     (VIRGULA n2=NUM {$soma += $n2.int; 
                      if (!($n2.int > 0 && $n2.int < 20))
                      System.out.println("Nota OUT OF RANGE");
                      $totalNotas += 1;}
     )* RP           {if ($totalNotas < 4)
                      System.out.println("Erro: O Aluno " + $nomeA + " tem notas a menos");
                      if ($totalNotas > 6)
                      System.out.println("Erro: O Aluno " + $nomeA + " tem notas a mais");}
     ; 

//LEXER

TURMA: [tT][uU][rR][mM][aA];
ID: [a-zA-Z]+;
NOME: [a-zA-Z]+;
NUM: [0-9]+;
VIRGULA: ',';
PONTOVIRGULA: ';';
PONTO: '.';
LP: '(';
RP: ')';
WS: ('\r'? '\n' | ' ' | '\t')+ -> skip;