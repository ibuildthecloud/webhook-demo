import os
import time
import logging
import pymongo

class Database(object):
    URI = os.getenv('MONGODB_URL', 'mongodb://webhook-db:27017/webhook')
    DATABASE = None

    def initialize():
        while True:
            time.sleep(1)
            try:
                client = pymongo.MongoClient(Database.URI)
                Database.DATABASE = client.get_default_database()
                logging.debug("-> connected to MongoDB")
                return
            except Exception as e:
                logging.error("-> cannot connect to MongoDB, retrying...")
                logging.error(str(e))
                pass

    @staticmethod
    def insert(collection, data):
        return Database.DATABASE[collection].insert_one(data)

    @staticmethod
    def find(collection, query):
        return Database.DATABASE[collection].find(query)

    @staticmethod
    def find_one(collection, query, sort=None):
        return Database.DATABASE[collection].find_one(query, sort=sort)

    @staticmethod
    def update_one(collection, query, data, upsert=True):
        Database.DATABASE[collection].update_one(
            query, {"$set": data}, upsert=upsert)

    @staticmethod
    def remove(collection, query):
        return Database.DATABASE[collection].remove(query)

    @staticmethod
    def count(collection, query):
        return Database.DATABASE[collection].count(query)

    @staticmethod
    def aggregate(collection, pipeline):
        return Database.DATABASE[collection].aggregate(pipeline)
