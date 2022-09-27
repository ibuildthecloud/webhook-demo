from flask import jsonify
from lib.db import Database
from . import routes


@routes.route('/stats', methods=['GET'])
def stats():
    webhooks_nbr = Database.count("webhooks", {})
    history_items_nbr = Database.count("data", {})
    return jsonify(
        {
            "stats": {
                "number_of_webhooks": webhooks_nbr,
                "number_of_payloads_received": history_items_nbr
            }
        }
    )
