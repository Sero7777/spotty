import { Message } from "node-nats-streaming";
import { Subscriber, SpotUpdatedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";

export class SpotUpdatedSubscriber extends Subscriber<SpotUpdatedEvent> {
  topic: Topics.SpotUpdated = Topics.SpotUpdated;
  queueGroupName = "queueGroupName";

  async onMessage(data: SpotUpdatedEvent["data"], msg: Message) {
    console.log("Received new SpotUpdatedEvent: " + data);

    const _id = data.id;
    const spot = await Spot.findById({ _id });

    if (!spot) throw new Error("spot not found");

    spot.set(data);

    await spot.save();

    console.log("SpotUpdatedEvent: ok");

    msg.ack();
  }
}
