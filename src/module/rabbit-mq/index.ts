import createMQProducer from "./producer"
import "./consumer"
const producer = createMQProducer("EXPRESSAPP")

export {
    producer
}