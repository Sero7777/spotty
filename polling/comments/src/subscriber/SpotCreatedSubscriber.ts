import { Message } from "node-nats-streaming";
import { Subscriber, SpotCreatedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";

export class SpotCreatedSubscriber extends Subscriber<SpotCreatedEvent> {
  topic: Topics.SpotCreated = Topics.SpotCreated;
  queueGroupName = "queueGroupName";

  async onMessage(data: SpotCreatedEvent["data"], msg: Message) {
    const spot = Spot.build(data);

    await spot.save();

    msg.ack();
  }
}
