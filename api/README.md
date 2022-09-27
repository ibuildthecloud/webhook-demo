This microservice expose an HTTP api and communicate with the underlying database to:
- create new webhook endpoint (dedicated token)
- create data
- publish each piece of data to the underlying NATS message broker