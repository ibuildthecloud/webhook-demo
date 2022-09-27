## Purpose

Simple application providing always-on webhooks for tests and demo purposes

## Architecture

The application follows a microservice architecture, it is composed of: 

- www: the frontend web
- api: microservice which manipulates the data and communicate with an underlying database
- ws: websocket server to make sure the frontend is updated in real time each time the application receives a new payload

On top of those micro-services, additional components are used: 

- NATS message broker
- MongoDB database
- Traefik reverse proxy in front of the application

The schema below illustrates the architecture of the application: 

![Architecture](./images/architecture.png)

## Local deployment

- Clone the application repositories

```
mkdir webhooks && cd webhooks
for repo in www api ws web-hook; do
  git clone https://gitlab.com/web-hook/$repo.git
done
```

- Run the application with Docker Compose:

```
cd web-hook
docker compose up
```

The application will be available on http://localhost

## Usage

First go on the landing page

![Landing page](./images/wh-1.png)

Then scroll down to get the "Get my webhook" button

![Get your webhook 1](./images/wh-2.png)

Click on the button and get the information for you dedicated webhook

![Get your webhook 2](./images/wh-3.png)

Go to the dashboard (will be empty as no data have been sent to your webhook yet)

![Dashboard](./images/wh-4.png)

From a terminal, curl the simple curl command to send a first payload to your webhook (your token will be different than the one used in this example):

```
curl -XPOST -H "Authorization: Bearer 7e8d8c4d5df7a7a56345a7832c60de" localhost/data -d '{"ok": "hello"}' -H 'Content-Type: application/json'
```

See the json payload appearing in real time on your dashboard

![Data received](./images/wh-5.png)

## Web development

The following instructions allows to run the www service (based on NextJS) in development mode. In this mode NextJS deploy a proxy so all the backend services can be used

- Running the backend services (api, ws, nats, mongo) with Docker Compose

```
docker compose -f docker-compose.dev.yml up
```

- Running the frontend in dev mode (the following command needs to be run from the *www* repository)

```
npm run dev
```

The frontend is available on [http://localhost:3000](http://localhost:3000) and it is configured to call the api running on [http://localhost:5000](http://localhost:5000) and the websocket server running on [http://localhost:8080](http://localhost:8080)
 