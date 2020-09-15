import { Message } from "node-nats-streaming";
import { Subscriber, CommentCreatedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";
import { Comment } from "../models/comment";
import { SpotNotFoundException } from "@spotty/shared";

export class CommentCreatedSubscriber extends Subscriber<CommentCreatedEvent> {
  topic: Topics.CommentCreated = Topics.CommentCreated;
  queueGroupName = "Query";

  async onMessage(data: CommentCreatedEvent["data"], msg: Message) {
    const { id, spot, content, username, timestamp } = data;

    const spotFromDb = await Spot.findOne({ _id: spot });

    if (!spotFromDb) {
      throw new SpotNotFoundException();
    }

    const comment = Comment.build({
      content,
      username,
    });

    comment._id = id;

    spotFromDb.comments.push(comment);
    spotFromDb.timestamp = timestamp
    await spotFromDb.save();

    msg.ack();
  }
}
