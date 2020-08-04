import request from "supertest";
import { app } from "../app";
import { Spot } from "../models/spot";
import { Uri } from "../routes/uris";
import mongoose from "mongoose";

it("returns 200 if successful", async () => {
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
    .get(Uri.READ)
    .set("Cookie", global.login())
    .send({ id: res.body.id })
    .expect(200);
});

it("returns 401 if unauthorized", async () => {
  await request(app).post(Uri.CREATE).send({ id: "" }).expect(401);
});

it("returns comment if successful", async () => {
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

  const res2 = await request(app)
    .get(Uri.READ)
    .set("Cookie", global.login())
    .send({ id: res.body.id })
    .expect(200);

  expect(res2.body.content).toEqual("Content1");
});

it("returns 400 if comment not existant", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const res2 = await request(app)
    .get(Uri.READ)
    .set("Cookie", global.login())
    .send({ id })
    .expect(404);
});
