// Generated from C:\Users\UX550V\Desktop\Uni\4Ano\GCS\Trabalho\trabalho.g4 by ANTLR 4.1

import java.util.*;
import javafx.util.Pair;



import org.antlr.v4.runtime.misc.NotNull;
import org.antlr.v4.runtime.tree.ParseTreeVisitor;

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by {@link trabalhoParser}.
 *
 * @param <T> The return type of the visit operation. Use {@link Void} for
 * operations with no return type.
 */
public interface trabalhoVisitor<T> extends ParseTreeVisitor<T> {
	/**
	 * Visit a parse tree produced by {@link trabalhoParser#recurso}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRecurso(@NotNull trabalhoParser.RecursoContext ctx);

	/**
	 * Visit a parse tree produced by {@link trabalhoParser#quote}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitQuote(@NotNull trabalhoParser.QuoteContext ctx);

	/**
	 * Visit a parse tree produced by {@link trabalhoParser#cprog}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitCprog(@NotNull trabalhoParser.CprogContext ctx);

	/**
	 * Visit a parse tree produced by {@link trabalhoParser#al}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitAl(@NotNull trabalhoParser.AlContext ctx);

	/**
	 * Visit a parse tree produced by {@link trabalhoParser#tr}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitTr(@NotNull trabalhoParser.TrContext ctx);

	/**
	 * Visit a parse tree produced by {@link trabalhoParser#ra}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitRa(@NotNull trabalhoParser.RaContext ctx);

	/**
	 * Visit a parse tree produced by {@link trabalhoParser#desc}.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	T visitDesc(@NotNull trabalhoParser.DescContext ctx);
}