(
    cd tests && \
    docker-compose build --no-cache && \
    docker-compose up -d mongo nats api && \
    docker-compose run test
    docker-compose down -v
)
