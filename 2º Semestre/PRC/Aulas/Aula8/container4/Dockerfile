# Indicamos a imagem de base

FROM python

# Instalamos o módulo flask

RUN pip install flask

# Instalamos o módulo requests

RUN pip install requests

# Criamos a pasta de trabalho dentro da imagem

WORKDIR /app

# Copiamos o resto

COPY main.py .

# Expomos a porta em que o servidor está programado para correr

EXPOSE 3026

# Colocamos o servidor a correr

CMD [ "python", "main.py" ]