import javafx.application.Application;
import org.antlr.v4.runtime.CommonTokenStream;
import org.antlr.v4.runtime.CharStreams;

import java.io.IOException;

public class Main  {


    public static void main(String[] args){
        trabalhoParser.TrContext ctx = null;
        try{
            trabalhoLexer lexer = new trabalhoLexer(CharStreams.fromFileName("teste.txt"));
            CommonTokenStream stream = new CommonTokenStream(lexer);
            trabalhoParser parser = new trabalhoParser(stream);
            ctx = parser.tr();
        }
        catch (IOException e){
            e.printStackTrace();
        }
        GUI gui = new GUI();
        gui.inicio(args,ctx.listaAlunos,ctx.listaConceitos);
    }


}