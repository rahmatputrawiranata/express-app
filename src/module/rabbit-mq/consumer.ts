import amqp, { Message } from 'amqplib/callback_api'
import {sendEmail} from "../../../services"

module.exports = amqp.connect('amqp://localhost', (errConn, conn) => {
  if (errConn) {
    throw errConn
  }

  conn.createChannel((errChan, chan) => {
    if (errChan) {
      throw errChan
    }

    console.log('Connected to RabbitMQ Consumer')
    chan.assertQueue("EXPRESSAPP", { durable: true })
    chan.consume("EXPRESSAPP", (msg: Message | null) => {
      if (msg) {
        const parsed = JSON.parse(msg.content.toString())
        switch (parsed.action) {
          case 'SEND_EMAIL':
            console.log(parsed.data, 'content')
            sendEmail(parsed.data)
            break
          default:
            break
        }
      }
    }, { noAck: true })
  })
})