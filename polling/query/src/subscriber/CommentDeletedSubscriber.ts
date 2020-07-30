import { Message } from "node-nats-streaming";
import { Subscriber, CommentDeletedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";
import { SpotNotFoundException } from "@spotty/shared";

export class CommentDeletedSubscriber extends Subscriber<CommentDeletedEvent> {
  topic: Topics.CommentDeleted = Topics.CommentDeleted;
  queueGroupName = "queueGroupName";

  async onMessage(data: CommentDeletedEvent["data"], msg: Message) {
    const { id, spot } = data;

    const spotFromDb = await Spot.findOne({ _id: spot });

    if (!spotFromDb) {
      throw new SpotNotFoundException();
    }

    spotFromDb.comments.filter(comment => comment._id !== id)

    await spotFromDb.save();

    msg.ack();
  }
}
