import request from "supertest";
import { app } from "../app";
import mongoose from "mongoose";
import { Uri } from "../routes/uris";

it("returns 200 if deletion was sucessful", async () => {
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

  const spot = res.body;

  await request(app)
    .delete(Uri.DELETE)
    .set("Cookie", global.login())
    .send({ id: spot.id })
    .expect(200);
});

it("deletes the spot", async () => {
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

  const spot = res.body;

  await request(app)
    .delete(Uri.DELETE)
    .set("Cookie", global.login())
    .send({ id: spot.id })
    .expect(200);

  await request(app)
    .get(Uri.READ)
    .set("Cookie", global.login())
    .send({ id: spot.id })
    .expect(404);
});

it("returns a 404 if spot doesnt exist", async () => {
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

  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(Uri.DELETE)
    .set("Cookie", global.login())
    .send({ id })
    .expect(404);
});

it("returns a 401 if unauthorized", async () => {
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

  const id = res.body.id

  await request(app).delete(Uri.DELETE).send({ id }).expect(401);
});
