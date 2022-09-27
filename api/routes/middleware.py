from flask import request, jsonify, g
from lib.db import Database
from lib.helpers import *
from lib.auth import *
from . import routes


@routes.before_request
def before_request_func():
    # Make sure this is not triggered for the create endpoint
    if request.endpoint in ["routes.create", "routes.stats", "routes.healthz"]:
        return

    # Retrieve authentication token
    token = get_auth_token(request)

    # A token must be provided
    if token == None:
        return jsonify({"error": "authentication required"}), 401

    # If token provided, retrieve assocaited webhook
    item = Database.find_one("webhooks", {"token": token})
    if item == None:
        return jsonify({"error": "not found"}), 404

    if not "name" in item:
        return jsonify({"error": "cannot get webhook name"}), 500

    g.webhook = {"name": item["name"]}
    if "created_at" in item:
        g.webhook["created_at"] = item["created_at"]
    else:
        g.webhook["created_at"] = "unknown"
