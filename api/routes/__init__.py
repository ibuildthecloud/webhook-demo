from .routes import *
from .middleware import *
from .data import *
from .healthz import *
from .stats import *
from .webhook import *
from flask import jsonify


@ routes.errorhandler(422)
@ routes.errorhandler(400)
def handle_error(err):
    headers = err.data.get("headers", None)
    messages = err.data.get("messages", ["Invalid request."])
    if headers:
        return jsonify({"errors": messages}), err.code, headers
    else:
        return jsonify({"errors": messages}), err.code
