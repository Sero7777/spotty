import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { SpotUpdatedEvent } from "@spotty/shared";
import { SpotUpdatedSubscriber } from "../subscriber/SpotUpdatedSubscriber";
import { natsContainer } from "../nats-container";
import { Spot } from "../models/spot";
import { app } from "../app";
import { initSocketIo } from "../websockets";

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
    pic: ""
  })
  await spot.save()

  const updatedTitle = "This is the updated title"

  const data: SpotUpdatedEvent["data"] = {
    id: spot._id,
    title: updatedTitle,
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
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, updatedTitle, data, msg };
};

describe("testing the spotCreatedSubscriber", () => {
  let io;
  let server: any;
  let sockets: any[] = [];

  beforeAll(() => {
    server = require("http").Server(app);
    io = require("socket.io")(server);
    server.listen(3000, () => console.log("io server running"));

    initSocketIo(io);
  });

  afterAll(() => {
    server.close(() => {
      sockets.forEach((sock: any) => {
        sock.destroy();
      });
    });
  });

  it("saves the spot to db", async () => {
    const { listener, updatedTitle, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const spotFromDb = await Spot.findById(data.id);

    expect(spotFromDb).toBeDefined()
    expect(spotFromDb!.title).toEqual(updatedTitle)
  });

  it("acks the message", async () => {
    const { listener, data, msg } = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
  });
});
