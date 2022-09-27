import os
import time
import json
import logging
from pynats import NATSClient


class NATS(object):
    NATS_URL = os.getenv('NATS_URL', 'nats://nats:4222')

    # Publish a payload on a given subject
    @staticmethod
    def pub(subject, payload):
        try:
            with NATSClient(NATS.NATS_URL, socket_timeout=2) as client:
                client.publish(subject, payload=json.dumps(payload).encode())
            logging.debug('{} published to {}'.format(payload, subject))
        except Exception as e:
            logging.error("cannot publish payload {} to NATS".format(payload))

    # Publish a payload on a given subject and wait for reply
    @staticmethod
    def req(subject, payload):
        try:
            with NATSClient(NATS.NATS_URL, socket_timeout=2) as client:
                resp = client.request(
                    subject, payload=json.dumps(payload).encode())
                logging.debug('Response received {}'.format(resp))
        except Exception as e:
            logging.error(
                "cannot send request {} to NATS : {}".format(payload, str(e)))
            raise Exception(str(e))
