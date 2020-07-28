import { Message } from "node-nats-streaming";
import { Subscriber, SpotDeletedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";
import { Comment } from "../models/comment";

export class SpotDeletedSubscriber extends Subscriber<SpotDeletedEvent> {
  topic: Topics.SpotDeleted = Topics.SpotDeleted;
  queueGroupName = "queueGroupName";

  async onMessage(data: SpotDeletedEvent["data"], msg: Message) {
    console.log("Received new SpotDeletedEvent: " + data);

    const _id = data.id;
    const spot = await Spot.findById({ _id });

    if (!spot) throw new Error("spot not found");

    await Spot.deleteOne({ _id });

    await Comment.deleteMany({ spot });

    console.log("SpotdeletedEvent: ok");

    msg.ack();
  }
}
