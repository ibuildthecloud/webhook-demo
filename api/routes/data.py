from flask import request, jsonify, g
from lib.db import Database
from lib.helpers import *
from lib.auth import *
from lib.nats import NATS
from . import routes
import datetime
import logging


@routes.route('/data', methods=['POST'])
def handle_request():

    # Make sure payload is a correct json
    payload = None
    try:
        payload = request.json
    except Exception as e:
        logging.error("cannot parse incoming json")
        logging.error(request.get_data())
        return jsonify({"error": "cannot parse incoming json"}), 400

    if payload == None:
        return jsonify({"error": "payload is empty"}), 400

    # So, what does the payload look like
    logging.info(payload)

    # Object to be built from payload
    data = {}

    # Make sure payload is dict or str
    if type(payload) == dict:
        logging.debug("payload is a dict")
        data["content"] = payload
    elif type(payload) == str:
        logging.debug("payload is a string")
        if payload == "":
            return jsonify({"error": "payload cannot be an empty string"}), 400

        # If not an empty string => build a json object from the string provided
        data["content"] = payload
    else:
        return jsonify({"error": "payload is invalid"}), 400

    # Add current timestamp information
    data["created_at"] = datetime.datetime.now().astimezone().isoformat()

    # Publish payload to NATS
    NATS.pub('data.{}'.format(g.webhook["name"]), data)

    data["webhook"] = g.webhook["name"]
    Database.insert("data", data)

    return jsonify({"info": "payload saved"}), 201


@routes.route('/data', methods=['GET'])
def get_history():
    # Check how many log entries must be returned
    nbr = get_nbr(request)

    # Get data history from database
    pipeline = [
        {
            "$match": {
                "webhook": g.webhook["name"]
            }
        },
        {
            "$sort": {
                "created_at": -1
            }
        },
        {"$limit": nbr},
        {
            "$project":
            {
                "_id": 0,
                "webhook": 0
            }
        }
    ]
    cursor = Database.aggregate("data", pipeline)
    data = list(cursor)
    return jsonify(
        {
            "webhook": g.webhook["name"],
            "data": data
        }
    )
