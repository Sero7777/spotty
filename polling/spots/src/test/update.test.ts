import request from "supertest";
import { app } from "../app";
import { Uri } from "../routes/uris";
import mongoose from "mongoose";
import { cookie } from "express-validator";

it("returns 200 if successful", async () => {
    const cookie = global.login();
    const title = "Another super cool test title"
  
    const res = await request(app)
      .post(Uri.CREATE)
      .set("Cookie", cookie)
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
      });
  
      const spot = res.body
      spot.title = title
  
      await request(app)
      .put(Uri.UPDATE)
      .set("Cookie", cookie)
      .send(spot)
      .expect(200);
});

it("updates if successful", async () => {
  const cookie = global.login();
  const title = "Another super cool test title"

  const res = await request(app)
    .post(Uri.CREATE)
    .set("Cookie", cookie)
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
    });

    const spot = res.body
    spot.title = title

    const updatedSpot = await request(app)
    .put(Uri.UPDATE)
    .set("Cookie", cookie)
    .send(spot)
    .expect(200);

  expect(updatedSpot.body.title).toEqual(title);
});

it("returns 404 is spot does not exist", async () => {
    const cookie = global.login();
    const title = "Another super cool test title"
  
    const res = await request(app)
      .post(Uri.CREATE)
      .set("Cookie", cookie)
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
      });
  
      const spot = res.body
      spot.id =  new mongoose.Types.ObjectId().toHexString();
  
      await request(app)
      .put(Uri.UPDATE)
      .set("Cookie", cookie)
      .send(spot)
      .expect(404);
});

// 401 if not authorized

it("returns 401 if unauthorized", async () => {
    const cookie = global.login();
    const title = "Another super cool test title"
  
    const res = await request(app)
      .post(Uri.CREATE)
      .set("Cookie", cookie)
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
      });
  
      const spot = res.body
      spot.title = title
  
      await request(app)
      .put(Uri.UPDATE)
      .send(spot)
      .expect(401);
});

// 400 if invalid input

it("returns 400 if invalid input", async () => {
    const cookie = global.login();
  const title = "tooshort"

  const res = await request(app)
    .post(Uri.CREATE)
    .set("Cookie", cookie)
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
    });

    const spot = res.body
    spot.title = title

    const updatedSpot = await request(app)
    .put(Uri.UPDATE)
    .set("Cookie", cookie)
    .send(spot)
    .expect(400);
});
