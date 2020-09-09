import request from "supertest";
import { app } from "../app";
import { Spot } from "../models/spot";
import { Uri } from "../routes/uris";
import { natsContainer } from "../nats-container";

it("publishes an event if sucessful", async () => {
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
  });

  const spotWithId = await spot.save();

  const res = await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({ spotId: spotWithId._id, content: "Content1" })
    .expect(201);

  await request(app)
    .delete(Uri.DELETE)
    .set("Cookie", global.login())
    .send({ id: res.body.id })
    .expect(200);

  expect(natsContainer.client.publish).toHaveBeenCalled();
});
