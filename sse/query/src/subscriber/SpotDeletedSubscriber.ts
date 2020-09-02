import { Message } from "node-nats-streaming";
import { Subscriber, SpotDeletedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";
import { notifyClients, actions } from "../sse";

export class SpotDeletedSubscriber extends Subscriber<SpotDeletedEvent> {
  topic: Topics.SpotDeleted = Topics.SpotDeleted;
  queueGroupName = "Query";

  async onMessage(data: SpotDeletedEvent["data"], msg: Message) {

    const _id = data.id;
    const spot = await Spot.findOne({ _id });

    if (!spot) throw new Error("spot not found");

    await Spot.deleteOne({ _id });

    msg.ack();

    notifyClients(actions.DELETE_SPOT, _id);
  }
}
