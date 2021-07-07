/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

grammar trabalho;


@header {
import java.util.*;
import javafx.util.Pair;


}

@members {
	class Recurso{
	    public int id;
	    public String desc;
	    public int idade;

	    public Recurso(int id, String desc, int idade){
	        this.id = id;
	        this.desc = desc;
	        this.idade = idade;
	    }

	    public int getId(){
	        return this.id;
	    }

	    public String getDesc(){
	        return this.desc;
	    }

	    public int getIdade(){
	        return this.idade;
	    }

	    public Recurso clone(){
	        return new Recurso(this.id,this.desc,this.idade);
	    }


	    @Override
	    public boolean equals(Object o) {
	        if (this == o) return true;
	        if (o == null || getClass() != o.getClass()) return false;
	        Recurso recurso = (Recurso) o;
	        return id == recurso.id;
	    }

	    @Override
	    public int hashCode() {
	        return Objects.hash(id);
	    }
	    
	    public String toString(){
	        return "Recurso{" +"ID:"+ this.id +", Desc:" + this.desc + ", Idade ideal: " + this.idade + "}";
	    }

	}

	class Aluno {
	    public String id;
	    public String nome;
	    public int idade;
	    public ArrayList<String> caracteristicas;
	    
	    public Aluno(){
	        this.id = "";
	        this.nome = "";
	        this.idade = 0;
	        this.caracteristicas = null;
	    }
	    
	    public Aluno(String id, String nome, int idade, ArrayList<String> caracteristicas) {
	        this.id = id;
	        this.nome = nome;
	        this.idade = idade;
	        this.caracteristicas = caracteristicas;
	    }

	    public String getId() {
	        return this.id;
	    }

	    public String getNome() {
	        return this.nome;
	    }

	    public int getIdade() {
	        return this.idade;
	    }

	    public int diferencaGeracao(int ida){
	        int i1 = 0 ; int i2 = 0;
	        if(this.idade>=0 & this.idade < 5) i1 = 1;
	        if(this.idade>= 5 & this.idade < 12) i1 = 2;
	        if(this.idade>=12 & this.idade < 18) i1 = 3;
	        if(this.idade>=18 & this.idade < 30) i1 = 4;
	        if(this.idade>=30 & this.idade < 50) i1 = 5;
	        if(this.idade>=50 & this.idade < 70) i1 = 6;
	        if(this.idade>=70) i1 = 7;

	        if(ida>=0 & ida < 5) i2 = 1;
	        if(ida>= 5 & ida < 12) i2 = 2;
	        if(ida>=12 & ida < 18) i2 = 3;
	        if(ida>=18 & ida < 30) i2 = 4;
	        if(ida>=30 & ida < 50) i2 = 5;
	        if(ida>=50 & ida < 70) i2 = 6;
	        if(ida>=70) i2 = 7;
	        return (100 - (Math.abs(i1-i2)*(100/6)));
	    }

	    public int diferencaIdade(int ida){
	        int i = Math.abs(this.idade - ida);
	        if (i > 100) return 0;
	        return 100-i;
	    }

	    public ArrayList<String> getCaracteristicas(){
	        return this.caracteristicas;
	    }

	    public boolean equals(String i){
	        return (this.id.equals(i));
	    }
	}

	class Conceitos {
	    public HashMap<String, HashMap<String, ArrayList<Recurso>>> conceitos;

	    public Conceitos() {
	        this.conceitos = new HashMap<String, HashMap<String, ArrayList<Recurso>>>();
	    }

	    public HashMap<String, HashMap<String, ArrayList<Recurso>>> getConceitos() {
	        return this.conceitos;
	    }

	    public void addRecurso(String c, Recurso recurso, ArrayList<String> caracteristicas) {
	        if (this.conceitos.containsKey(c)) {
	            for (String car : caracteristicas) {
	                if (this.conceitos.get(c).containsKey(car)) {
	                    this.conceitos.get(c).get(car).add(recurso.clone());
	                } else {
	                    ArrayList<Recurso> lr = new ArrayList<Recurso>();
	                    lr.add(recurso.clone());
	                    this.conceitos.get(c).put(car, lr);
	                }
	            }
	        } else {
	            HashMap<String, ArrayList<Recurso>> lc = new HashMap<String, ArrayList<Recurso>>();
	            for (String car : caracteristicas) {
	                ArrayList<Recurso> lr = new ArrayList<Recurso>();
	                lr.add(recurso.clone());
	                lc.put(car, lr);
	            }
	            this.conceitos.put(c, lc);
	        }
	    }

	    public ArrayList<Pair<Recurso, Integer>> getRecursos(String conc, Aluno aluno) {
	        ArrayList<String> car = aluno.getCaracteristicas();
	        HashMap<Recurso, ArrayList<String>> ret = new HashMap<Recurso, ArrayList<String>>();
	        for (String c : car) {
	            ArrayList<Recurso> rec = this.conceitos.get(conc).get(c);
	            if (rec != null) {
	                for (Recurso r : rec) {
	                    if (ret.containsKey(r))
	                        ret.get(r).add(c);
	                    else {
	                        ArrayList<String> lc = new ArrayList<String>();
	                        lc.add(c);
	                        ret.put(r, lc);
	                    }
	                }
	            }
	        }


	        ArrayList<Pair<Recurso, Integer>> re = new ArrayList<Pair<Recurso, Integer>>();
	        
	        for (Map.Entry<Recurso, ArrayList<String>> entry : ret.entrySet()) {
	            int nota = (int)(((entry.getValue().size()*100)/aluno.getCaracteristicas().size()) * 0.7 +
	                       0.3 * (aluno.diferencaGeracao(entry.getKey().getIdade()) * 0.9 + (aluno.diferencaIdade(entry.getKey().getIdade())) * 0.1));
	            re.add(new Pair<Recurso, Integer>(entry.getKey(), nota));
	        }
	        if (re.size() > 0) {
	            Collections.sort(
	                    re
	                    , new Comparator<Pair<Recurso, Integer>>() {
	                        public int compare(Pair<Recurso, Integer> a, Pair<Recurso, Integer> b) {
	                            return Integer.compare(b.getValue(), a.getValue());
	                        }
	                    }
	            );


	        }
	        return re;

	    }
	}
}

// PARSER 

tr returns [Conceitos listaConceitos, ArrayList<Aluno> listaAlunos]

    : ra al {$listaConceitos = $ra.listaConceitos; $listaAlunos = $al.listaAlunos;}
    ;


ra returns [Conceitos listaConceitos]
@init {
       $ra.listaConceitos = new Conceitos();
}
   : (RA recurso (cprog {
                         $ra.listaConceitos.addRecurso($cprog.c,$recurso.rec,$recurso.lista);
                         }
     )+)+
   ;
     
recurso returns [Recurso rec, ArrayList<String> lista]
    :  p1=PAL quote desc p2=PAL {
                $recurso.rec = new Recurso($p1.int, $quote.q, $p2.int);
                $recurso.lista = $desc.lista;
                }
    ;

al returns [ArrayList<Aluno> listaAlunos]
@init {
       $al.listaAlunos = new ArrayList<Aluno>();
}
    : (AL ALUNO quote desc PAL  {$al.listaAlunos.add(new Aluno($ALUNO.text, $quote.q, $PAL.int, $desc.lista));}
      )+
   ;


cprog returns [String c]
    : CPROG quote {$c = $quote.q;}
    ;

          
desc returns [ArrayList<String> lista]
    : LPARENT PAL {
                   $lista = new ArrayList<String>();
                   $lista.add($PAL.text);
                   }
      (VIRGULA PAL {
                   $lista.add($PAL.text);
                   }
      )* RPARENT
     ;

quote returns [String q]
    : QUOTE { 
             String c = $QUOTE.text; 
             $quote.q = c.replace("\"" , "");
             }
    ;



//LEXER

RA : [Rr][Aa]
   ;

AL : [Aa][Ll]
   ;

CPROG : [Cc][Pp][Rr][Oo][Gg]
      ;

ALUNO : [Aa|Pp][0-9]+
       ;

PAL : [a-zA-Z0-9]+
        ;

QUOTE : '"' ~('\r' | '\n' | '"')* '"';
COM :  '/*' ~([*/])* '*/' -> skip;

VIRGULA: ',';
PONTO: '.';
PONTOVIRGULA: ';';
LPARENT: '(';
RPARENT: ')';
ASPAS : '"';

WS: ('\r'? '\n' | ' ' | '\t')+ ->skip;


