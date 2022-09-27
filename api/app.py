from flask import Flask, request, jsonify, g
from flask_cors import CORS
from routes import *
from lib.db import Database
from errors import errors
import logging

# Define log level
logging.basicConfig(level=logging.DEBUG)

# Connect to the database
Database.initialize()

# Define application
app = Flask(__name__)

# Make sure it can be accessed from other domain (CORS)
CORS(app)

# Define endpoints (http routes)
app.register_blueprint(errors)
app.register_blueprint(routes)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
