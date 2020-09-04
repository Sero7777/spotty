import { Message } from "node-nats-streaming";
import { Subscriber, CommentDeletedEvent, Topics } from "@spotty/shared";
import { Spot } from "../models/spot";
import { SpotNotFoundException } from "@spotty/shared";
import { notifyClients, actions } from "../websockets";

export class CommentDeletedSubscriber extends Subscriber<CommentDeletedEvent> {
  topic: Topics.CommentDeleted = Topics.CommentDeleted;
  queueGroupName = "Query";

  async onMessage(data: CommentDeletedEvent["data"], msg: Message) {
    const { id, spot } = data;

    const spotFromDb = await Spot.findOne({ _id: spot });

    if (!spotFromDb) {
      throw new SpotNotFoundException();
    }

    const index = spotFromDb.comments.findIndex((x) => x._id == id);
    if (index != -1) {
      spotFromDb.comments.splice(index, 1);
      spotFromDb.markModified("comments");
      const newSpot = await spotFromDb.save();
      notifyClients(actions.UPDATE_SPOT, newSpot);
    }

    msg.ack();
  }
}
