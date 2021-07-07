FROM python

RUN pip install requests

WORKDIR /app

COPY server.py .

RUN ["python","server.py"]

EXPOSE 8000

CMD python -m http.server