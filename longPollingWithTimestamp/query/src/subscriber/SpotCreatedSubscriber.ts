import { Message } from "node-nats-streaming";
import { Subscriber, SpotCreatedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";
import { notifyClients } from "../longpolling";

export class SpotCreatedSubscriber extends Subscriber<SpotCreatedEvent> {
  topic: Topics.SpotCreated = Topics.SpotCreated;
  queueGroupName = "Query";

  async onMessage(data: SpotCreatedEvent["data"], msg: Message) {
    const spot = Spot.build(data);
    spot._id = data.id;

    const spotFromDb = await spot.save();
    
    msg.ack();

    notifyClients()
  }
}
