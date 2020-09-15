import { Message } from "node-nats-streaming";
import { Subscriber, SpotUpdatedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";
import { notifyClients } from "../longpolling";

export class SpotUpdatedSubscriber extends Subscriber<SpotUpdatedEvent> {
  topic: Topics.SpotUpdated = Topics.SpotUpdated;
  queueGroupName = "Query";

  async onMessage(data: SpotUpdatedEvent["data"], msg: Message) {

    const _id = data.id;
    const spot = await Spot.findOne({ _id });

    if (!spot) throw new Error("spot not found");

    spot.set(data);

    const newSpot = await spot.save();

    msg.ack();

    notifyClients();
  }
}
