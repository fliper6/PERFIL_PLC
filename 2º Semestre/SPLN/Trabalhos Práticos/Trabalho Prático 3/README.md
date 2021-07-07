## Trabalho Prático de Scripting no Processamento de Linguagem Natural
#### Universidade do Minho - Mestrado Integrado em Engenharia Informática

Este trabalho consiste numa aplicação em **python** que efetua Web Scraping de uma "família" de utilizadores do Github. Ou seja, dado o username de uma pessoa e o nível de profundidade a que se pretende chegar, recolhe os dados dos utilizadores (Nome, Username, Local, Instituição, ...) até esse nível.

Por exemplo, uma pesquisa com o username "fliper6" e de nível "2", iria resultar nos dados sobre fliper6, nos dados dos utilizadores que fliper6 segue e ainda nos dados de todos os utilizadores que esses seguem. A informação é depois guardada num ficheiro **JSON** e transformada numa ontologia de formato *Turtle* (TTL). Também é necessário fornecer um terceiro argumento, que corresponde ao número máximo de utilizadores pretendido - se não se quiser definir nenhum máximo, basta simplesmente escrever "No" no seu lugar.

Adicionalmente, foi criada uma simples API para que se possa observar estes dados de maneira mais apelativa e interativa. 

Em suma, esta aplicação é ferramenta útil para alguém que está à procura de expandir os seus contactos no Github ou que necessita de adquirir dados sobre utilizadores para os seus próprios projetos.

## Instruções
Para gerar o exemplo anterioriormente explicado, isto é, para gerar os ficheiros JSON e TTL correspondentes, é necessário correr os seguintes comandos:
```sh
cd SPLN-TP
make spln USER=fliper6 NIVEL=2 MAX=30
```
No caso da API, utilizou-se o [GraphDB](https://graphdb.ontotext.com/) para dar host aos dados do ficheiro TTL e criou-se um programa baseado em JavaScript que utiliza a biblioteca **axios** para executar os pedidos de dados necessários. Os dados são depois exibidos em páginas web, cujas templates foram feitas com a linguagem **pug**.

Para executá-la, é necessário criar um repositório no GraphDB, importar os dados TTL e, de seguida, executar os seguintes comandos para iniciar o programa da API:
```sh
cd SPLN-TP
cd api
npm i
npm start
```



Feito por: 
- Filipa Santos (A83631)
- Ricardo Cunha (A84302)
