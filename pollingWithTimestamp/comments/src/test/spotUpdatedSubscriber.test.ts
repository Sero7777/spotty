import { Message } from "node-nats-streaming";
import { SpotUpdatedEvent } from "@spotty/shared";
import { SpotUpdatedSubscriber } from "../subscriber/SpotUpdatedSubscriber";
import { natsContainer } from "../nats-container";
import { Spot } from "../models/spot";

const setup = async () => {
  const listener = new SpotUpdatedSubscriber(natsContainer.client);

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
    pic: "",
    timestamp: Date.now()
  })
  await spot.save()

  const updatedTitle = "This is the updated title"

  const data: SpotUpdatedEvent["data"] = {
    id: spot._id,
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
    pic: "",
    title: updatedTitle,
    timestamp: spot.timestamp
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, updatedTitle, data, msg };
};

it("deleted", async () => {
  const { listener, updatedTitle, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const spotFromDb = await Spot.findById(data.id);

  expect(spotFromDb).toBeDefined()
  expect(spotFromDb!.title).toEqual(updatedTitle)
});

  it('acks the message', async () => {
    const { listener, updatedTitle, data, msg } = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
