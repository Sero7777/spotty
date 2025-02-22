import { Message } from "node-nats-streaming";
import { Subscriber, SpotCreatedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";

export class SpotCreatedSubscriber extends Subscriber<SpotCreatedEvent> {
  topic: Topics.SpotCreated = Topics.SpotCreated;
  queueGroupName = "Query";

  async onMessage(data: SpotCreatedEvent["data"], msg: Message) {
    const spot = Spot.build(data);
    spot._id = data.id

    await spot.save();

    msg.ack();
  }
}
