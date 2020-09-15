import { Message } from "node-nats-streaming";
import { Subscriber, CommentUpdatedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";
import { SpotNotFoundException } from "@spotty/shared";
import { notifyClients } from "../longpolling";

export class CommentUpdatedSubscriber extends Subscriber<CommentUpdatedEvent> {
  topic: Topics.CommentUpdated = Topics.CommentUpdated;
  queueGroupName = "Query";

  async onMessage(data: CommentUpdatedEvent["data"], msg: Message) {
    const { id, spot, content, timestamp } = data;

    const spotFromDb = await Spot.findOne({ _id: spot });

    if (!spotFromDb) {
      throw new SpotNotFoundException();
    }

    const index = spotFromDb.comments.findIndex((x) => x._id.toString() == id.toString());
    if (index != -1) {
      spotFromDb.comments[index].content = content;
      spotFromDb.markModified("comments");
      spotFromDb.timestamp = timestamp
      const newSpot = await spotFromDb.save();
      notifyClients();
    }

    msg.ack();
  }
}
