# twitter-images-through-kafka

For local dev environment

### Kafka Init
Start Kafka in a container
```
docker-compose up
```
Define topic (twitter-cats)
```
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh \
     --create \
     --bootstrap-server localhost:9092 \
     --replication-factor 1 \
     --partitions 1 \
     --topic twitter-cats
```

### Fetching Tweet via Twitter API and produce messages to topic
The variables CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN and ACCESS_TOKEN_SECRET are environment variables.
They are provided by Twitter API (Elevated access).
```
cd fetch-twit
npm ci
npm run start:fetchtweet
```

### Read messages and send data through WebSocket
```
cd consume-media
npm ci
npm run start:consume
```

### Receive data via WebSocket and display them in Browser
```
cd twitter-image-kafka
npm ci
npm run dev
```
Go to `localhost:3000` to enjoy the cat pics.
