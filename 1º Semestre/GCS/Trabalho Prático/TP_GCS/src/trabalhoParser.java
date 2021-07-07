// Generated from C:\Users\UX550V\Desktop\Uni\4Ano\GCS\Trabalho\trabalho.g4 by ANTLR 4.1

import java.util.*;
import javafx.util.Pair;



import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class trabalhoParser extends Parser {
	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		RA=1, AL=2, CPROG=3, CA=4, CO=5, ALUNO=6, PAL=7, QUOTE=8, COM=9, VIRGULA=10, 
		PONTO=11, PONTOVIRGULA=12, LPARENT=13, RPARENT=14, ASPAS=15, WS=16;
	public static final String[] tokenNames = {
		"<INVALID>", "RA", "AL", "CPROG", "CA", "CO", "ALUNO", "PAL", "QUOTE", 
		"COM", "','", "'.'", "';'", "'('", "')'", "'\"'", "WS"
	};
	public static final int
		RULE_tr = 0, RULE_ra = 1, RULE_recurso = 2, RULE_al = 3, RULE_cprog = 4, 
		RULE_desc = 5, RULE_quote = 6;
	public static final String[] ruleNames = {
		"tr", "ra", "recurso", "al", "cprog", "desc", "quote"
	};

	@Override
	public String getGrammarFileName() { return "trabalho.g4"; }

	@Override
	public String[] getTokenNames() { return tokenNames; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public ATN getATN() { return _ATN; }


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




	public trabalhoParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class TrContext extends ParserRuleContext {
		public Conceitos listaConceitos;
		public ArrayList<Aluno> listaAlunos;
		public RaContext ra;
		public AlContext al;
		public RaContext ra() {
			return getRuleContext(RaContext.class,0);
		}
		public AlContext al() {
			return getRuleContext(AlContext.class,0);
		}
		public TrContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tr; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).enterTr(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).exitTr(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof trabalhoVisitor ) return ((trabalhoVisitor<? extends T>)visitor).visitTr(this);
			else return visitor.visitChildren(this);
		}
	}

	public final TrContext tr() throws RecognitionException {
		TrContext _localctx = new TrContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_tr);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(14); ((TrContext)_localctx).ra = ra();
			setState(15); ((TrContext)_localctx).al = al();
			((TrContext)_localctx).listaConceitos =  ((TrContext)_localctx).ra.listaConceitos; ((TrContext)_localctx).listaAlunos =  ((TrContext)_localctx).al.listaAlunos;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RaContext extends ParserRuleContext {
		public Conceitos listaConceitos;
		public RecursoContext recurso;
		public CprogContext cprog;
		public List<RecursoContext> recurso() {
			return getRuleContexts(RecursoContext.class);
		}
		public RecursoContext recurso(int i) {
			return getRuleContext(RecursoContext.class,i);
		}
		public List<CprogContext> cprog() {
			return getRuleContexts(CprogContext.class);
		}
		public CprogContext cprog(int i) {
			return getRuleContext(CprogContext.class,i);
		}
		public TerminalNode RA(int i) {
			return getToken(trabalhoParser.RA, i);
		}
		public List<TerminalNode> RA() { return getTokens(trabalhoParser.RA); }
		public RaContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ra; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).enterRa(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).exitRa(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof trabalhoVisitor ) return ((trabalhoVisitor<? extends T>)visitor).visitRa(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RaContext ra() throws RecognitionException {
		RaContext _localctx = new RaContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_ra);

		       _localctx.listaConceitos = new Conceitos();

		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(27); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(18); match(RA);
				setState(19); ((RaContext)_localctx).recurso = recurso();
				setState(23); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(20); ((RaContext)_localctx).cprog = cprog();

					                         _localctx.listaConceitos.addRecurso(((RaContext)_localctx).cprog.c,((RaContext)_localctx).recurso.rec,((RaContext)_localctx).recurso.lista);
					                         
					}
					}
					setState(25); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==CPROG );
				}
				}
				setState(29); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==RA );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RecursoContext extends ParserRuleContext {
		public Recurso rec;
		public ArrayList<String> lista;
		public Token p1;
		public QuoteContext quote;
		public DescContext desc;
		public Token p2;
		public TerminalNode PAL(int i) {
			return getToken(trabalhoParser.PAL, i);
		}
		public DescContext desc() {
			return getRuleContext(DescContext.class,0);
		}
		public List<TerminalNode> PAL() { return getTokens(trabalhoParser.PAL); }
		public QuoteContext quote() {
			return getRuleContext(QuoteContext.class,0);
		}
		public RecursoContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_recurso; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).enterRecurso(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).exitRecurso(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof trabalhoVisitor ) return ((trabalhoVisitor<? extends T>)visitor).visitRecurso(this);
			else return visitor.visitChildren(this);
		}
	}

	public final RecursoContext recurso() throws RecognitionException {
		RecursoContext _localctx = new RecursoContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_recurso);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(31); ((RecursoContext)_localctx).p1 = match(PAL);
			setState(32); ((RecursoContext)_localctx).quote = quote();
			setState(33); ((RecursoContext)_localctx).desc = desc();
			setState(34); ((RecursoContext)_localctx).p2 = match(PAL);

			                _localctx.rec = new Recurso((((RecursoContext)_localctx).p1!=null?Integer.valueOf(((RecursoContext)_localctx).p1.getText()):0), ((RecursoContext)_localctx).quote.q, (((RecursoContext)_localctx).p2!=null?Integer.valueOf(((RecursoContext)_localctx).p2.getText()):0));
			                _localctx.lista = ((RecursoContext)_localctx).desc.lista;
			                
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AlContext extends ParserRuleContext {
		public ArrayList<Aluno> listaAlunos;
		public Token ALUNO;
		public QuoteContext quote;
		public DescContext desc;
		public Token PAL;
		public TerminalNode ALUNO(int i) {
			return getToken(trabalhoParser.ALUNO, i);
		}
		public TerminalNode PAL(int i) {
			return getToken(trabalhoParser.PAL, i);
		}
		public TerminalNode AL(int i) {
			return getToken(trabalhoParser.AL, i);
		}
		public List<DescContext> desc() {
			return getRuleContexts(DescContext.class);
		}
		public List<TerminalNode> AL() { return getTokens(trabalhoParser.AL); }
		public List<TerminalNode> PAL() { return getTokens(trabalhoParser.PAL); }
		public List<TerminalNode> ALUNO() { return getTokens(trabalhoParser.ALUNO); }
		public QuoteContext quote(int i) {
			return getRuleContext(QuoteContext.class,i);
		}
		public DescContext desc(int i) {
			return getRuleContext(DescContext.class,i);
		}
		public List<QuoteContext> quote() {
			return getRuleContexts(QuoteContext.class);
		}
		public AlContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_al; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).enterAl(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).exitAl(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof trabalhoVisitor ) return ((trabalhoVisitor<? extends T>)visitor).visitAl(this);
			else return visitor.visitChildren(this);
		}
	}

	public final AlContext al() throws RecognitionException {
		AlContext _localctx = new AlContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_al);

		       _localctx.listaAlunos = new ArrayList<Aluno>();

		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(44); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(37); match(AL);
				setState(38); ((AlContext)_localctx).ALUNO = match(ALUNO);
				setState(39); ((AlContext)_localctx).quote = quote();
				setState(40); ((AlContext)_localctx).desc = desc();
				setState(41); ((AlContext)_localctx).PAL = match(PAL);
				_localctx.listaAlunos.add(new Aluno((((AlContext)_localctx).ALUNO!=null?((AlContext)_localctx).ALUNO.getText():null), ((AlContext)_localctx).quote.q, (((AlContext)_localctx).PAL!=null?Integer.valueOf(((AlContext)_localctx).PAL.getText()):0), ((AlContext)_localctx).desc.lista));
				}
				}
				setState(46); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==AL );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CprogContext extends ParserRuleContext {
		public String c;
		public QuoteContext quote;
		public TerminalNode CPROG() { return getToken(trabalhoParser.CPROG, 0); }
		public QuoteContext quote() {
			return getRuleContext(QuoteContext.class,0);
		}
		public CprogContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_cprog; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).enterCprog(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).exitCprog(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof trabalhoVisitor ) return ((trabalhoVisitor<? extends T>)visitor).visitCprog(this);
			else return visitor.visitChildren(this);
		}
	}

	public final CprogContext cprog() throws RecognitionException {
		CprogContext _localctx = new CprogContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_cprog);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(48); match(CPROG);
			setState(49); ((CprogContext)_localctx).quote = quote();
			((CprogContext)_localctx).c =  ((CprogContext)_localctx).quote.q;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DescContext extends ParserRuleContext {
		public ArrayList<String> lista;
		public Token PAL;
		public TerminalNode LPARENT() { return getToken(trabalhoParser.LPARENT, 0); }
		public TerminalNode PAL(int i) {
			return getToken(trabalhoParser.PAL, i);
		}
		public TerminalNode VIRGULA(int i) {
			return getToken(trabalhoParser.VIRGULA, i);
		}
		public TerminalNode RPARENT() { return getToken(trabalhoParser.RPARENT, 0); }
		public List<TerminalNode> PAL() { return getTokens(trabalhoParser.PAL); }
		public List<TerminalNode> VIRGULA() { return getTokens(trabalhoParser.VIRGULA); }
		public DescContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_desc; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).enterDesc(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).exitDesc(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof trabalhoVisitor ) return ((trabalhoVisitor<? extends T>)visitor).visitDesc(this);
			else return visitor.visitChildren(this);
		}
	}

	public final DescContext desc() throws RecognitionException {
		DescContext _localctx = new DescContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_desc);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(52); match(LPARENT);
			setState(53); ((DescContext)_localctx).PAL = match(PAL);

			                   ((DescContext)_localctx).lista =  new ArrayList<String>();
			                   _localctx.lista.add((((DescContext)_localctx).PAL!=null?((DescContext)_localctx).PAL.getText():null));
			                   
			setState(60);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==VIRGULA) {
				{
				{
				setState(55); match(VIRGULA);
				setState(56); ((DescContext)_localctx).PAL = match(PAL);

				                   _localctx.lista.add((((DescContext)_localctx).PAL!=null?((DescContext)_localctx).PAL.getText():null));
				                   
				}
				}
				setState(62);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(63); match(RPARENT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class QuoteContext extends ParserRuleContext {
		public String q;
		public Token QUOTE;
		public TerminalNode QUOTE() { return getToken(trabalhoParser.QUOTE, 0); }
		public QuoteContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_quote; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).enterQuote(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof trabalhoListener ) ((trabalhoListener)listener).exitQuote(this);
		}
		@Override
		public <T> T accept(ParseTreeVisitor<? extends T> visitor) {
			if ( visitor instanceof trabalhoVisitor ) return ((trabalhoVisitor<? extends T>)visitor).visitQuote(this);
			else return visitor.visitChildren(this);
		}
	}

	public final QuoteContext quote() throws RecognitionException {
		QuoteContext _localctx = new QuoteContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_quote);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(65); ((QuoteContext)_localctx).QUOTE = match(QUOTE);
			 
			             String c = (((QuoteContext)_localctx).QUOTE!=null?((QuoteContext)_localctx).QUOTE.getText():null); 
			             _localctx.q = c.replace("\"" , "");
			             
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\uacf5\uee8c\u4f5d\u8b0d\u4a45\u78bd\u1b2f\u3378\3\22G\4\2\t\2\4\3\t"+
		"\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\3\2\3\2\3\2\3\2\3\3\3\3\3\3"+
		"\3\3\3\3\6\3\32\n\3\r\3\16\3\33\6\3\36\n\3\r\3\16\3\37\3\4\3\4\3\4\3\4"+
		"\3\4\3\4\3\5\3\5\3\5\3\5\3\5\3\5\3\5\6\5/\n\5\r\5\16\5\60\3\6\3\6\3\6"+
		"\3\6\3\7\3\7\3\7\3\7\3\7\3\7\7\7=\n\7\f\7\16\7@\13\7\3\7\3\7\3\b\3\b\3"+
		"\b\3\b\2\t\2\4\6\b\n\f\16\2\2C\2\20\3\2\2\2\4\35\3\2\2\2\6!\3\2\2\2\b"+
		".\3\2\2\2\n\62\3\2\2\2\f\66\3\2\2\2\16C\3\2\2\2\20\21\5\4\3\2\21\22\5"+
		"\b\5\2\22\23\b\2\1\2\23\3\3\2\2\2\24\25\7\3\2\2\25\31\5\6\4\2\26\27\5"+
		"\n\6\2\27\30\b\3\1\2\30\32\3\2\2\2\31\26\3\2\2\2\32\33\3\2\2\2\33\31\3"+
		"\2\2\2\33\34\3\2\2\2\34\36\3\2\2\2\35\24\3\2\2\2\36\37\3\2\2\2\37\35\3"+
		"\2\2\2\37 \3\2\2\2 \5\3\2\2\2!\"\7\t\2\2\"#\5\16\b\2#$\5\f\7\2$%\7\t\2"+
		"\2%&\b\4\1\2&\7\3\2\2\2\'(\7\4\2\2()\7\b\2\2)*\5\16\b\2*+\5\f\7\2+,\7"+
		"\t\2\2,-\b\5\1\2-/\3\2\2\2.\'\3\2\2\2/\60\3\2\2\2\60.\3\2\2\2\60\61\3"+
		"\2\2\2\61\t\3\2\2\2\62\63\7\5\2\2\63\64\5\16\b\2\64\65\b\6\1\2\65\13\3"+
		"\2\2\2\66\67\7\17\2\2\678\7\t\2\28>\b\7\1\29:\7\f\2\2:;\7\t\2\2;=\b\7"+
		"\1\2<9\3\2\2\2=@\3\2\2\2><\3\2\2\2>?\3\2\2\2?A\3\2\2\2@>\3\2\2\2AB\7\20"+
		"\2\2B\r\3\2\2\2CD\7\n\2\2DE\b\b\1\2E\17\3\2\2\2\6\33\37\60>";
	public static final ATN _ATN =
		ATNSimulator.deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}