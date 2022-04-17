const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  brokers: [`localhost:9092`],
  clientId: 'example-consumer'
})

const consumer = kafka.consumer({ groupId: 'test-group' })
const sendMessage = async function (ws) {
  await consumer.connect()
  await consumer.subscribe({ topic: 'twitter-cats', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      ws.send(message.value.toString())
    }
  })
}

const { WebSocket, WebSocketServer } = require('ws')
const wss = new WebSocketServer({ port: 8081 })

wss.on('connection', function connection(ws) {
  ws.on('message', async function message(data) {
    console.log('received: %s', data)
    // Start sending data to WebSocket when client connects
    if (data.indexOf('Hello') > -1) {
      sendMessage(ws)
    }
    // Gracefully disconnect consumer when client is closed
    // Doesn't work as expected
    if (data.indexOf('Bye') > -1) {
      await consumer.disconnect()
    }
  })
})
