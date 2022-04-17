const Twit = require('twit')
const { Kafka } = require('kafkajs')

const T = new Twit({
  consumer_key:         process.env.CONSUMER_KEY,
  consumer_secret:      process.env.CONSUMER_SECRET,
  access_token:         process.env.ACCESS_TOKEN,
  access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true     // optional - requires SSL certificates to be valid.
})

const kafka = new Kafka({
  brokers: [`localhost:9092`],
  clientId: 'twitter-producer'
})

const topic = 'twitter-cats'
const producer = kafka.producer()
// Looking for some cat pics in Asia
const stream = T.stream('statuses/filter', { track: ['猫', '고양이'] })

setInterval(() => {
  stream.on('tweet', async function (tweet) {
    if (typeof tweet.extended_entities !== 'undefined') {
      await producer.connect()
      await producer.send({
        topic: topic,
        messages: [
          { value: JSON.stringify(tweet.extended_entities) }
        ]
      })
    }
  })
}, 10000)
