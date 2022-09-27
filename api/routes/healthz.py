from flask import request, jsonify, g
from . import routes
import logging


@routes.route('/app/healthz', methods=['GET'])
def healthz():
    # TODO: add some deeper checks
    return jsonify({}), 200
