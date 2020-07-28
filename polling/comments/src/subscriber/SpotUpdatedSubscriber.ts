import { Message } from "node-nats-streaming";
import { Subscriber, SpotUpdatedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";

export class SpotCreatedSubscriber extends Subscriber<SpotUpdatedEvent> {
  topic: Topics.SpotUpdated = Topics.SpotUpdated;
  queueGroupName = "queueGroupName";

  async onMessage(data: SpotUpdatedEvent["data"], msg: Message) {
    const _id = data.id;
    const spot = await Spot.findById({ _id });

    if (!spot) throw new Error("spot not found");

    spot.set(data);

    await spot.save();

    msg.ack();
  }
}
