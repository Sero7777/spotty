import request from "supertest";
import { app } from "../app";
import { Uri } from "../routes/uris";
import { natsContainer } from "../nats-container";

it("calls publisher when spot is created", async () => {
  await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({
      title: "This is a test title",
      description:
        "This is a test description. I hope this will work out well.",
      upvotes: 5,
      streetname: "teststreet",
      zip: "testZip",
      city: "testCity",
      country: "testCountry",
      category: "testCategory",
      latitude: 75.423423,
      longitude: 78.2342134,
      pic: "",
    })
    .expect(201);

  const response = await request(app)
    .get(Uri.READALL)
    .set("Cookie", global.login())
    .send();

  expect(response.body.length).toEqual(1);
  expect(natsContainer.client.publish).toHaveBeenCalled();
});
