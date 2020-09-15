import request from "supertest";
import { app } from "../app";
import { Spot } from "../models/spot";
import { Uri } from "../routes/uris";
import mongoose from "mongoose";

it("returns 404 if comment not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).delete(Uri.DELETE).send({ id }).expect(401);
});

it("returns 401 if not authorized", async () => {
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
  });

  const spotWithId = await spot.save();

  const res = await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({ spotId: spotWithId._id, content: "Content1" })
    .expect(201);

  await request(app).delete(Uri.DELETE).send({ id: res.body.id }).expect(401);
});

it("returns 200 if success", async () => {
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
});

it("deletes comment if success", async () => {
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

  const res2 = await request(app)
    .get(Uri.READALL)
    .set("Cookie", global.login())
    .send();
  expect(res2.body.length).toEqual(0);
});