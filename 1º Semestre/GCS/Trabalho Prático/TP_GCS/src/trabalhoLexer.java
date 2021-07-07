// Generated from C:\Users\UX550V\Desktop\Uni\4Ano\GCS\Trabalho\trabalho.g4 by ANTLR 4.1

import java.util.*;
import javafx.util.Pair;



import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class trabalhoLexer extends Lexer {
	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		RA=1, AL=2, CPROG=3, CA=4, CO=5, ALUNO=6, PAL=7, QUOTE=8, COM=9, VIRGULA=10, 
		PONTO=11, PONTOVIRGULA=12, LPARENT=13, RPARENT=14, ASPAS=15, WS=16;
	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	public static final String[] tokenNames = {
		"<INVALID>",
		"RA", "AL", "CPROG", "CA", "CO", "ALUNO", "PAL", "QUOTE", "COM", "','", 
		"'.'", "';'", "'('", "')'", "'\"'", "WS"
	};
	public static final String[] ruleNames = {
		"RA", "AL", "CPROG", "CA", "CO", "ALUNO", "PAL", "QUOTE", "COM", "VIRGULA", 
		"PONTO", "PONTOVIRGULA", "LPARENT", "RPARENT", "ASPAS", "WS"
	};


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





	public trabalhoLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "trabalho.g4"; }

	@Override
	public String[] getTokenNames() { return tokenNames; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	@Override
	public void action(RuleContext _localctx, int ruleIndex, int actionIndex) {
		switch (ruleIndex) {
		case 8: COM_action((RuleContext)_localctx, actionIndex); break;

		case 15: WS_action((RuleContext)_localctx, actionIndex); break;
		}
	}
	private void COM_action(RuleContext _localctx, int actionIndex) {
		switch (actionIndex) {
		case 0: skip();  break;
		}
	}
	private void WS_action(RuleContext _localctx, int actionIndex) {
		switch (actionIndex) {
		case 1: skip();  break;
		}
	}

	public static final String _serializedATN =
		"\3\uacf5\uee8c\u4f5d\u8b0d\u4a45\u78bd\u1b2f\u3378\2\22n\b\1\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\3\2\3\2\3"+
		"\2\3\3\3\3\3\3\3\4\3\4\3\4\3\4\3\4\3\4\3\5\3\5\3\5\3\6\3\6\3\6\3\7\3\7"+
		"\6\78\n\7\r\7\16\79\3\b\6\b=\n\b\r\b\16\b>\3\t\3\t\7\tC\n\t\f\t\16\tF"+
		"\13\t\3\t\3\t\3\n\3\n\3\n\3\n\7\nN\n\n\f\n\16\nQ\13\n\3\n\3\n\3\n\3\n"+
		"\3\n\3\13\3\13\3\f\3\f\3\r\3\r\3\16\3\16\3\17\3\17\3\20\3\20\3\21\5\21"+
		"e\n\21\3\21\3\21\6\21i\n\21\r\21\16\21j\3\21\3\21\2\22\3\3\1\5\4\1\7\5"+
		"\1\t\6\1\13\7\1\r\b\1\17\t\1\21\n\1\23\13\2\25\f\1\27\r\1\31\16\1\33\17"+
		"\1\35\20\1\37\21\1!\22\3\3\2\17\4\2TTtt\4\2CCcc\4\2NNnn\4\2EEee\4\2RR"+
		"rr\4\2QQqq\4\2IIii\7\2CCRRccrr~~\3\2\62;\5\2\62;C\\c|\5\2\f\f\17\17$$"+
		"\4\2,,\61\61\4\2\13\13\"\"t\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3"+
		"\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2"+
		"\2\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37"+
		"\3\2\2\2\2!\3\2\2\2\3#\3\2\2\2\5&\3\2\2\2\7)\3\2\2\2\t/\3\2\2\2\13\62"+
		"\3\2\2\2\r\65\3\2\2\2\17<\3\2\2\2\21@\3\2\2\2\23I\3\2\2\2\25W\3\2\2\2"+
		"\27Y\3\2\2\2\31[\3\2\2\2\33]\3\2\2\2\35_\3\2\2\2\37a\3\2\2\2!h\3\2\2\2"+
		"#$\t\2\2\2$%\t\3\2\2%\4\3\2\2\2&\'\t\3\2\2\'(\t\4\2\2(\6\3\2\2\2)*\t\5"+
		"\2\2*+\t\6\2\2+,\t\2\2\2,-\t\7\2\2-.\t\b\2\2.\b\3\2\2\2/\60\t\5\2\2\60"+
		"\61\t\3\2\2\61\n\3\2\2\2\62\63\t\5\2\2\63\64\t\7\2\2\64\f\3\2\2\2\65\67"+
		"\t\t\2\2\668\t\n\2\2\67\66\3\2\2\289\3\2\2\29\67\3\2\2\29:\3\2\2\2:\16"+
		"\3\2\2\2;=\t\13\2\2<;\3\2\2\2=>\3\2\2\2><\3\2\2\2>?\3\2\2\2?\20\3\2\2"+
		"\2@D\7$\2\2AC\n\f\2\2BA\3\2\2\2CF\3\2\2\2DB\3\2\2\2DE\3\2\2\2EG\3\2\2"+
		"\2FD\3\2\2\2GH\7$\2\2H\22\3\2\2\2IJ\7\61\2\2JK\7,\2\2KO\3\2\2\2LN\n\r"+
		"\2\2ML\3\2\2\2NQ\3\2\2\2OM\3\2\2\2OP\3\2\2\2PR\3\2\2\2QO\3\2\2\2RS\7,"+
		"\2\2ST\7\61\2\2TU\3\2\2\2UV\b\n\2\2V\24\3\2\2\2WX\7.\2\2X\26\3\2\2\2Y"+
		"Z\7\60\2\2Z\30\3\2\2\2[\\\7=\2\2\\\32\3\2\2\2]^\7*\2\2^\34\3\2\2\2_`\7"+
		"+\2\2`\36\3\2\2\2ab\7$\2\2b \3\2\2\2ce\7\17\2\2dc\3\2\2\2de\3\2\2\2ef"+
		"\3\2\2\2fi\7\f\2\2gi\t\16\2\2hd\3\2\2\2hg\3\2\2\2ij\3\2\2\2jh\3\2\2\2"+
		"jk\3\2\2\2kl\3\2\2\2lm\b\21\3\2m\"\3\2\2\2\n\29>DOdhj";
	public static final ATN _ATN =
		ATNSimulator.deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}