FROM python:3-alpine
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD gunicorn -w 4 --bind 0.0.0.0:5000 wsgi:app