import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.control.SelectionMode;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.stage.Modality;
import javafx.stage.Stage;
import javafx.util.Pair;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class GUI extends Application {
    Stage window;
    Button button;
    Scene scene;
    ListView<String> listView1, listView2;
    static ArrayList<trabalhoParser.Aluno> al;
    static trabalhoParser.Conceitos con;

    public void inicio(String[] args,ArrayList<trabalhoParser.Aluno> alu, trabalhoParser.Conceitos co){
        al = alu;
        con = co;
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {
        HashMap<String, HashMap<String, ArrayList<trabalhoParser.Recurso>>> co = con.getConceitos();
        window = primaryStage;
        window.setTitle("Procurar Recursos");
        window.setMinWidth(500);
        window.setMaxHeight(750);
        button = new Button("Procurar recursos");
        button.setOnAction(event -> display(getAluno(al,listView1.getSelectionModel().getSelectedItem().split(":")[0]), con, listView2.getSelectionModel().getSelectedItem()));
        button.setPrefHeight(50);
        button.setDisable(true);

        listView1 = new ListView<>();
        listView2 = new ListView<>();

        for(trabalhoParser.Aluno a : al){
            listView1.getItems().addAll(a.getId() + ": " + a.getNome());
        }
        listView1.getSelectionModel().setSelectionMode(SelectionMode.SINGLE);

        for(Map.Entry<String, HashMap<String, ArrayList<trabalhoParser.Recurso>>> entry : co.entrySet()){
            listView2.getItems().addAll(entry.getKey());
        }
        listView2.getSelectionModel().setSelectionMode(SelectionMode.SINGLE);

        listView1.setOnMouseClicked(event -> { if(!listView1.getSelectionModel().isEmpty()) listView2.setOnMouseClicked(event1 -> {if(!listView2.getSelectionModel().isEmpty())button.setDisable(false);});});
        listView2.setOnMouseClicked(event -> { if(!listView2.getSelectionModel().isEmpty()) listView1.setOnMouseClicked(event1 -> {if(!listView1.getSelectionModel().isEmpty())button.setDisable(false);});});

        HBox text = new HBox(10);
        text.setPadding(new Insets(20,20,0,20));
        text.getChildren().addAll(new Label("Selecione o aluno"),new Label("Selecione o conceito"));
        text.setSpacing(150);
        HBox listas = new HBox(10);
        listas.setPadding(new Insets(20,20,20,20));
        listas.getChildren().addAll(listView1,listView2);

        VBox botao = new VBox(10);
        botao.setPadding(new Insets(20,20,20,20));
        botao.setAlignment(Pos.CENTER);
        botao.getChildren().addAll(button);

        BorderPane borderPane = new BorderPane();
        borderPane.setTop(text);
        borderPane.setCenter(listas);
        borderPane.setBottom(botao);
        scene = new Scene(borderPane);
        window.setScene(scene);
        window.show();
    }

    public trabalhoParser.Aluno getAluno(ArrayList<trabalhoParser.Aluno> listaAlunos, String aluno){
        trabalhoParser.Aluno al = null;

        for(trabalhoParser.Aluno alu : listaAlunos){
            if(alu.equals(aluno)) {al = alu; break;}
        }
        return al;
    }

    public static void display(trabalhoParser.Aluno aluno, trabalhoParser.Conceitos co, String conceito){
        String message;
        ArrayList<Pair<trabalhoParser.Recurso,Integer>> recursos = co.getRecursos(conceito,aluno);

        int i = 0;
        if(recursos.size()>0) {
            message = "Para ajudar o aluno " + aluno.getNome() + " no conceito de programação " + conceito + " recomendam-se os recursos:";
            for (Pair<trabalhoParser.Recurso, Integer> e : recursos) {
                message += "\n\t- " + e.getKey().getDesc();
                i++;
                if (i >= 3) break;
            }
        }
        else message = "Não foram encontrados recursos adequados para o aluno " + aluno.getNome() + " no conceito de programação " + conceito + ".";
        Stage window = new Stage();
        String title = "Resultado";
        window.initModality(Modality.APPLICATION_MODAL);

        window.setTitle(title);
        window.setMinWidth(250);

        Label label = new Label();
        label.setText(message);

        Button close = new Button("Fechar a janela");
        close.setOnAction(e->window.close());
        label.setPadding(new Insets(0,0,20,0));
        VBox layout = new VBox(10);
        layout.getChildren().addAll(label,close);
        layout.setAlignment(Pos.CENTER);
        layout.setPadding(new Insets(20,20,20,20));

        Scene scene = new Scene(layout);
        window.setScene(scene);
        window.show();


    }
}
