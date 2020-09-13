import { Message } from "node-nats-streaming";
import { CommentDeletedEvent } from "@spotty/shared";
import { CommentDeletedSubscriber } from "../subscriber/CommentDeletedSubscriber";
import { natsContainer } from "../nats-container";
import { Spot } from "../models/spot";
import { Comment } from "../models/comment";

const setup = async () => {
  const listener = new CommentDeletedSubscriber(natsContainer.client);

  const spot = Spot.build({
    title: "This is a test title",
    username: "abcdefg",
    description: "This is a test description. I hope this will work out well.",
    upvotes: 5,
    streetname: "teststreet",
    zip: "testZip",
    city: "testCity",
    country: "testCountry",
    category: "testCategory",
    latitude: 75.423423,
    longitude: 78.2342134,
    pic: ""
  })

  const comment = Comment.build({
    username: "abcdefg",
    content: "This is a test comment",
  });
  await comment.save()
  spot.comments.push(comment)
  await spot.save()

  const data: CommentDeletedEvent["data"] = {
    id: spot.comments[0]._id,
    spot: spot._id
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("deletes the comment to db", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const spotFromDb = await Spot.findById(data.spot);

  expect(spotFromDb!.comments.length).toBe(0);
  expect(spotFromDb!._id.toString()).toEqual(data.spot.toString());
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
