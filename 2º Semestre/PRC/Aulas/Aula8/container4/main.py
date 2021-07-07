from flask import Flask
import requests

app = Flask(__name__)

@app.route("/")
def index():
    html = """
    <html>
      <head>
        <title>My first Python Web App</title>
        <meta charset="utf8"/>
      </head>
      <body>
        <h3>Operações disponíveis:</h3>
        <ul>
            <li><a href="/entidades">Lista de Entidades</a></li>
            <li><a href="/classesN3">Lista de Processos de Negócio</a></li>
        </ul>
      </body>
    </html>
    """
    return html


@app.route("/entidades")
def entidades():
    apikey = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwODE4ODU1YTcxOGRmNGVkMTkwZjE1ZSIsImlhdCI6MTYxOTEwMTc4MSwiZXhwIjoxNjIxNjkzNzgxfQ.SlyayNaXu8PTPYAtyR9h7tIlR9ooXn72DRn6EAwcgV6rNY1rZQCoSs_d2EESIJs3kb0LwCSfU9o5lWMW9_Twigj3FxX99iAg7_gB1m6TReJ2moZ-rYIst6RTtJtWQWBezZ-37RyACH9s44WQ9qnlrXBYKgnW6LyVi18KdfwEYekgbKM6bSkvPTVYdtjkzktKwKZfIouts4nQGm0tvTfQC_AtOP22338i5N2I952gBN0lf9fn6iaj64TCAXaUA4JhMNZad6ekK0AWauGZsHcaOaLiqpbxKjGs2d69fCOcdKsbDGwoGSEL_6TUho9Yfb405yS9ZE4TjatGNtBaRmSv9g"
    r = requests.get('http://clav-api.di.uminho.pt/v2/entidades?apikey=' + apikey)
    entidades = r.json()

    html = """
    <html>
      <head>
        <title>My first Python Web App</title>
        <meta charset="utf8"/>
      </head>
      <body>
        <h3>Lista de Entidades</h3>
        <table>
          <tr>
            <th>Sigla</th><th>Designação</th><th>Id</id>
          </tr>
    """
    for e in entidades:
        html += f"""
        <tr><td>{e['sigla']}</td><td>{e['designacao']}</td><td>{e['id']}</td></tr>
        """

    html +="""
        </table>
      </body>
    </html>
    """
    return html

@app.route("/classesN3")
def classesN3():
    return "<h3>Esta é para tu fazeres...</h3>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3026)

      
