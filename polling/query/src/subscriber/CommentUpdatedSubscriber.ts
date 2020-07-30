import { Message } from "node-nats-streaming";
import { Subscriber, CommentUpdatedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";
import { SpotNotFoundException } from "@spotty/shared";

export class CommentUpdatedSubscriber extends Subscriber<CommentUpdatedEvent> {
  topic: Topics.CommentUpdated = Topics.CommentUpdated;
  queueGroupName = "queueGroupName";

  async onMessage(data: CommentUpdatedEvent["data"], msg: Message) {
    const { id, spot, content } = data;

    const spotFromDb = await Spot.findOne({ _id: spot });

    if (!spotFromDb) {
      throw new SpotNotFoundException();
    }

    // check if item has same id as updated comment and if so, change the content
    spotFromDb.comments.map(comment => comment._id === id ? comment.content = content : comment )

    await spotFromDb.save();

    msg.ack();
  }
}
