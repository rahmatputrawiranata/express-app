import amqp, { Connection } from 'amqplib/callback_api'

const createMQProducer = (queueName: string) => {
  console.log('Connecting to RabbitMQ Producer...')
  let ch: any
  amqp.connect('amqp://localhost', (errorConnect: Error, connection: Connection) => {
    if (errorConnect) {
      console.log('Error connecting to RabbitMQ: ', errorConnect)
      return
    }

    connection.createChannel((errorChannel, channel) => {
      if (errorChannel) {
        console.log('Error creating channel: ', errorChannel)
        return
      }

      ch = channel
      console.log('Connected to RabbitMQ Producer')
    })
  })
  return (msg: string) => {
    console.log('Produce message to RabbitMQ...')
    console.log(queueName)
    ch.sendToQueue(queueName, Buffer.from(msg))
  }
}

export default createMQProducer