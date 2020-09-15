import request from "supertest";
import { app } from "../app";
import { Spot } from "../models/spot";
import { Uri } from "../routes/uris";

it("returns all comments", async () => {
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

  const spotWithId = await spot.save()

  await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({ spotId: spotWithId._id, content: "Content1" })
    .expect(201);

    await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({ spotId: spotWithId._id, content: "Content2" })
    .expect(201);

  const response = await request(app)
    .get(Uri.READALL)
    .set("Cookie", global.login())
    .expect(200);

  expect(response.body.length).toEqual(2);
});

it("returns 401 if unauthorized", async () => {
    const response = await request(app)
    .get(Uri.READALL)
    .expect(401);
})
