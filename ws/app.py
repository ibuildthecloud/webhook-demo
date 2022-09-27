import asyncio
import os
import logging
from urllib.parse import urlparse
from urllib.parse import parse_qs
import json
import websockets
from nats.aio.client import Client as NATS
from lib.db import Database


async def websocket_server(
        stop_signal: asyncio.Event,
        message_queue: asyncio.Queue):

    clients = {}

    async def register(websocket, path):
        logging.debug("new registration")
        logging.debug(websocket)
        logging.debug(path)
        webhook = None

        # Get token from path
        parsed_url = urlparse(path)
        try:
           token = parse_qs(parsed_url.query)['token'][0]
           logging.debug("TOKEN is {}".format(token))
        except Exception as e:
            token = None

        if token == None:
            logging.warning(
                "token not provided in query => client will subscribe to default webhook")
            webhook = "default"
            await websocket.send("webhook:{}".format(webhook))
        else:
            try:
                # Get webhook name from token
                o = Database.find_one("webhooks", {"token": token})
                if not o == None:
                    webhook = o["name"]
                    logging.debug(webhook)
                    await websocket.send("webhook:{}".format(webhook))
                else:
                    logging.error(
                        "token provided is invalid, client cannot register")
                    await websocket.send("error:token invalid")
            except Exception as e:
                logging.error("error:{}".format(e))
                await websocket.send("error:{}".format(e))

        # Register websocket against the corresponding webhook
        if webhook != None:
            if webhook in clients:
                clients[webhook].add(websocket)
            else:
                clients[webhook] = {websocket}

            # Wait forever for messages
            try:
                async for message in websocket:
                    logging.debug(
                        "Received message [{}] from {}".format(message, websocket))

                    # If unsubscribe received, remove websocket from list of clients
                    if message == "unsubscribe":
                        clients[webhook].remove(websocket)
            finally:
                try:
                    print("removing websocket from clients")
                    clients[webhook].remove(websocket)
                except Exception:
                    pass

    async with websockets.serve(register, "0.0.0.0", 8080):
        while not stop_signal.is_set():
            #  Get message provided in the asyncio queue by NATS
            msg = await message_queue.get()
            logging.debug("new message received by websocket server")
            logging.debug(msg)

            # Extract data and name of the assocaited webhook
            webhook = msg.split('|')[0]
            data = msg.split('|')[1]

            # Get all websocket client registered against this webhook
            for websocket in clients[webhook]:
                logging.debug("about to send message to websockets")
                try:
                    await websocket.send(data)
                except Exception as e:
                    logging.error(
                        "cannot send message to client {}".format(websocket))
                    logging.error(e)
                    # Delete websocket from the clients
                    clients[webhook].remove(websocket)


async def nats_server(message_queue: asyncio.Queue):
    # Connection to NATS message queue
    nats_url = os.getenv("NATS_URL", "nats://nats:4222")
    nc = NATS()
    await nc.connect([nats_url])

    async def message_handler(msg):
        logging.debug("new message received by NATS")
        logging.debug(msg)

        # Get webhook name from subject
        subject = msg.subject
        webhook = subject.split('.')[1]

        # Get string version of data (so it can be sent to asyncio queue)
        data = json.dumps(msg.data.decode("utf-8"))

        # Prefix message with name of the webhook
        data = '{}|{}'.format(webhook, data)

        # Send message to asyncio queue so webkook server can process it
        await message_queue.put(data)

    # Subscription to all data related messages
    await nc.subscribe("data.*", cb=message_handler)

    # TODO: figure out how to close the NATS connection?


async def main():
    stop_signal = asyncio.Event()
    message_queue = asyncio.Queue()
    websocket_server_task = asyncio.create_task(
        websocket_server(stop_signal, message_queue)
    )
    nats_server_task = asyncio.create_task(nats_server(message_queue))

    try:
        while True:
            await asyncio.sleep(1)
    except KeyboardInterrupt:
        stop_signal.set()
    await websocket_server_task


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)

    Database.initialize()

    asyncio.run(main())
