from flask import Flask, request, jsonify, g
from flask_cors import CORS
from lib.db import Database
from lib.helpers import *
from . import routes
import logging
import datetime


@routes.route('/wh', methods=['GET'])
def create():
    # Get a unique name for the webhook
    # TODO: loop until a non exising name is found
    name = create_item_name()

    # Get an authorization token to write/read from the webhook
    token = create_auth_token()

    # Keep track of creation timestamp
    created_at = datetime.datetime.now().astimezone().replace(microsecond=0).isoformat()

    # webhook to  be persisted in DB and returned to client
    webhook = {'name': name,
               'token': token,
               "created_at": created_at}

    # Persist name/token pair
    Database.insert("webhooks", {'name': name,
                                 'token': token,
                                 "created_at": created_at})

    return jsonify(webhook), 201


@routes.route('/wh', methods=['DELETE'])
def delete():
    # Delete webhook and associated data
    try:
        Database.remove("data", {"webhook": g.webhook["name"]})
        Database.remove("webhooks", {"name": g.webhook["name"]})
    except Exception as e:
        logging.error("cannot delete items from database")
    return jsonify({"info": "webhook {} deleted".format(g.webhook["name"])})


@routes.route('/wh/info', methods=['GET'])
def info():
    # Get several pieces of informations:
    # - name
    # - creation date
    # - number of payload received
    # - timestamp of last payload received

    # Get number of payload received by the current webhook
    payload_nbr = Database.count("data", {
        "webhook": g.webhook["name"]
    })

    # Get timestamd of last received payload
    if payload_nbr > 0:
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
            {"$limit": 1},
        ]
        cursor = Database.aggregate("data", pipeline)
        last_data_item = list(cursor)[0]
        last_payload_date = last_data_item["created_at"]
    else:
        last_payload_date = "N/A"

    info = {
        "info": {
            "name": g.webhook["name"],
            "created_at": g.webhook["created_at"],
            "payload_nbr": payload_nbr,
            "last_payload_date": last_payload_date
        }
    }

    return jsonify(info)
