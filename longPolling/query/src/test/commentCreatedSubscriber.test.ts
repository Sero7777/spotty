import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { CommentCreatedEvent } from "@spotty/shared";
import { CommentCreatedSubscriber } from "../subscriber/CommentCreatedSubscriber";
import { natsContainer } from "../nats-container";
import { Spot } from "../models/spot";

const setup = async () => {
  const listener = new CommentCreatedSubscriber(natsContainer.client);

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
  await spot.save()

  const data: CommentCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    spot: spot._id,
    content: "This is a test comment",
    username: "abcdefg"
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("saves the comment to db", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const spotFromDb = await Spot.findById(data.spot);

  expect(spotFromDb!.comments.length).toBe(1)
  expect(spotFromDb!._id.toString()).toEqual(data.spot.toString());
  expect(spotFromDb!.comments[0].content).toEqual(data.content);
});

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
