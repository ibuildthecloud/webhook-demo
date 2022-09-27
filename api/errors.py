from flask import Blueprint, jsonify

errors = Blueprint('errors', __name__)

@errors.app_errorhandler(404)
def not_found(error):
    return jsonify(error='not found'), 404

@errors.app_errorhandler(405)
def incorrect_method(error):
    return jsonify(error='incorrect method'), 405
