// Generated from C:\Users\UX550V\Desktop\Uni\4Ano\GCS\Trabalho\trabalho.g4 by ANTLR 4.1

import java.util.*;
import javafx.util.Pair;



import org.antlr.v4.runtime.misc.NotNull;
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link trabalhoParser}.
 */
public interface trabalhoListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link trabalhoParser#recurso}.
	 * @param ctx the parse tree
	 */
	void enterRecurso(@NotNull trabalhoParser.RecursoContext ctx);
	/**
	 * Exit a parse tree produced by {@link trabalhoParser#recurso}.
	 * @param ctx the parse tree
	 */
	void exitRecurso(@NotNull trabalhoParser.RecursoContext ctx);

	/**
	 * Enter a parse tree produced by {@link trabalhoParser#quote}.
	 * @param ctx the parse tree
	 */
	void enterQuote(@NotNull trabalhoParser.QuoteContext ctx);
	/**
	 * Exit a parse tree produced by {@link trabalhoParser#quote}.
	 * @param ctx the parse tree
	 */
	void exitQuote(@NotNull trabalhoParser.QuoteContext ctx);

	/**
	 * Enter a parse tree produced by {@link trabalhoParser#cprog}.
	 * @param ctx the parse tree
	 */
	void enterCprog(@NotNull trabalhoParser.CprogContext ctx);
	/**
	 * Exit a parse tree produced by {@link trabalhoParser#cprog}.
	 * @param ctx the parse tree
	 */
	void exitCprog(@NotNull trabalhoParser.CprogContext ctx);

	/**
	 * Enter a parse tree produced by {@link trabalhoParser#al}.
	 * @param ctx the parse tree
	 */
	void enterAl(@NotNull trabalhoParser.AlContext ctx);
	/**
	 * Exit a parse tree produced by {@link trabalhoParser#al}.
	 * @param ctx the parse tree
	 */
	void exitAl(@NotNull trabalhoParser.AlContext ctx);

	/**
	 * Enter a parse tree produced by {@link trabalhoParser#tr}.
	 * @param ctx the parse tree
	 */
	void enterTr(@NotNull trabalhoParser.TrContext ctx);
	/**
	 * Exit a parse tree produced by {@link trabalhoParser#tr}.
	 * @param ctx the parse tree
	 */
	void exitTr(@NotNull trabalhoParser.TrContext ctx);

	/**
	 * Enter a parse tree produced by {@link trabalhoParser#ra}.
	 * @param ctx the parse tree
	 */
	void enterRa(@NotNull trabalhoParser.RaContext ctx);
	/**
	 * Exit a parse tree produced by {@link trabalhoParser#ra}.
	 * @param ctx the parse tree
	 */
	void exitRa(@NotNull trabalhoParser.RaContext ctx);

	/**
	 * Enter a parse tree produced by {@link trabalhoParser#desc}.
	 * @param ctx the parse tree
	 */
	void enterDesc(@NotNull trabalhoParser.DescContext ctx);
	/**
	 * Exit a parse tree produced by {@link trabalhoParser#desc}.
	 * @param ctx the parse tree
	 */
	void exitDesc(@NotNull trabalhoParser.DescContext ctx);
}