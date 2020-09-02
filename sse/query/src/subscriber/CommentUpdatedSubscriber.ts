import { Message } from "node-nats-streaming";
import { Subscriber, CommentUpdatedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";
import { SpotNotFoundException } from "@spotty/shared";
import { notifyClients, actions } from "../sse";

export class CommentUpdatedSubscriber extends Subscriber<CommentUpdatedEvent> {
  topic: Topics.CommentUpdated = Topics.CommentUpdated;
  queueGroupName = "Query";

  async onMessage(data: CommentUpdatedEvent["data"], msg: Message) {
    const { id, spot, content } = data;

    const spotFromDb = await Spot.findOne({ _id: spot });

    if (!spotFromDb) {
      throw new SpotNotFoundException();
    }

    const index = spotFromDb.comments.findIndex((x) => x._id == id);
    if (index != -1) {
      spotFromDb.comments[index].content = content;
      spotFromDb.markModified("comments");
      const newSpot = await spotFromDb.save();
      notifyClients(actions.UPDATE_SPOT, newSpot);
    }

    msg.ack();
  }
}
