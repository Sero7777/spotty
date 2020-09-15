import { Message } from "node-nats-streaming";
import { SpotDeletedEvent } from "@spotty/shared";
import { SpotDeletedSubscriber } from "../subscriber/SpotDeletedSubscriber";
import { natsContainer } from "../nats-container";
import { Spot } from "../models/spot";

const setup = async () => {
  const listener = new SpotDeletedSubscriber(natsContainer.client);

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

  const data: SpotDeletedEvent["data"] = {
    id: spot._id,
    timestamp: spot.timestamp
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("deleted", async () => {
  const { listener, data, msg } = await setup();

  const spotBeforeDeletion = await Spot.findById(data.id)

  await listener.onMessage(data, msg);

  const spotFromDb = await Spot.findById(data.id);

  expect(spotBeforeDeletion).toBeDefined()
  expect(spotFromDb?.enabled).toBe(false)
});

  it('acks the message', async () => {
    const { listener, data, msg } = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
