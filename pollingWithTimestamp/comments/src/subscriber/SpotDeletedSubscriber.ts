import { Message } from "node-nats-streaming";
import { Subscriber, SpotDeletedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";
import { Comment } from "../models/comment";

export class SpotDeletedSubscriber extends Subscriber<SpotDeletedEvent> {
  topic: Topics.SpotDeleted = Topics.SpotDeleted;
  queueGroupName = "queueGroupName";

  async onMessage(data: SpotDeletedEvent["data"], msg: Message) {

    const _id = data.id;
    const timestamp = data.timestamp
    const spot = await Spot.findOne({ _id });

    if (!spot) throw new Error("spot not found");

    spot.set({
        timestamp,
        enabled:false
    })
    await spot.save();

    await Comment.deleteMany({ spot });

    msg.ack();
  }
}
