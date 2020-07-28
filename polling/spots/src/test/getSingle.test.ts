import request from "supertest";
import { app } from "../app";
import mongoose from "mongoose";
import { Uri } from "../routes/uris";

it("returns 200 if the spot was found", async () => {
  const res = await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({
      title: "This is a test title",
      description:
        "This is a test description. I hope this will work out well.",
      rating: 5,
      streetname: "teststreet",
      zip: "testZip",
      city: "testCity",
      country: "testCountry",
      category: "testCategory",
      latitude: 75.423423,
      longitude: 78.2342134,
      pic: "",
    });

  await request(app)
    .get(Uri.READ)
    .set("Cookie", global.login())
    .send({ id: res.body.id })
    .expect(200);
});

it("returns spot if the spot exists", async () => {
  const title = "testtitle123";
  const res = await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({
      title: title,
      description:
        "This is a test description. I hope this will work out well.",
      rating: 5,
      streetname: "teststreet",
      zip: "testZip",
      city: "testCity",
      country: "testCountry",
      category: "testCategory",
      latitude: 75.423423,
      longitude: 78.2342134,
      pic: "",
    });

  const resFromGet = await request(app)
    .get(Uri.READ)
    .set("Cookie", global.login())
    .send({ id: res.body.id })
    .expect(200);

  expect(resFromGet.body.title).toEqual(title);
});

it("returns a 404 if the spot doesnt exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(Uri.READ)
    .set("Cookie", global.login())
    .send({ id })
    .expect(404);
});
