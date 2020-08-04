import request from "supertest";
import { app } from "../app";
import { Uri } from "../routes/uris";

it("returns a 401 if not authorited", async () => {
  await request(app).post(Uri.CREATE).send({}).expect(401);
});

it("does not return 401 if the user is logged in", async () => {
  const res = await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({});

  expect(res.status).not.toEqual(401);
});

it("returns 400 if invalid title", async () => {
  await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({
      title: "tooshort",
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
    .expect(400);

  await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({
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
    .expect(400);
});

it("returns 400 if invalid description", async () => {
  await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({
      title: "This is a test title",
      description: "tooshort",
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
    .expect(400);

  await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({
      title: "This is a test title",
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
    .expect(400);
});

it("returns 400 if invalid lat", async () => {
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
      latitude: 92.21312,
      longitude: 78.2342134,
      pic: "",
    })
    .expect(400);

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
      latitude: -92.21312,
      longitude: 78.2342134,
      pic: "",
    })
    .expect(400);

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
      longitude: 78.2342134,
      pic: "",
    })
    .expect(400);
});

it("returns 400 if invalid long", async () => {
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
      latitude: 181.423423,
      longitude: 78.2342134,
      pic: "",
    })
    .expect(400);

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
      latitude: -181.423423,
      longitude: 78.2342134,
      pic: "",
    })
    .expect(400);

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
      longitude: 78.2342134,
      pic: "",
    })
    .expect(400);
});

it("returns 400 if no streetname", async () => {
  await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({
      title: "This is a test title",
      description:
        "This is a test description. I hope this will work out well.",
      upvotes: 5,
      zip: "testZip",
      city: "testCity",
      country: "testCountry",
      category: "testCategory",
      latitude: 75.423423,
      longitude: 78.2342134,
      pic: "",
    })
    .expect(400);
});

it("returns 400 if no zip", async () => {
  await request(app)
    .post(Uri.CREATE)
    .set("Cookie", global.login())
    .send({
      title: "This is a test title",
      description:
        "This is a test description. I hope this will work out well.",
      upvotes: 5,
      streetname: "teststreet",
      city: "testCity",
      country: "testCountry",
      category: "testCategory",
      latitude: 75.423423,
      longitude: 78.2342134,
      pic: "",
    })
    .expect(400);
});

it("returns 400 if no city", async () => {
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
      country: "testCountry",
      category: "testCategory",
      latitude: 75.423423,
      longitude: 78.2342134,
      pic: "",
    })
    .expect(400);
});

it("returns 400 if no country", async () => {
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
      category: "testCategory",
      latitude: 75.423423,
      longitude: 78.2342134,
      pic: "",
    })
    .expect(400);
});

it("returns 400 if no category", async () => {
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
      latitude: 75.423423,
      longitude: 78.2342134,
      pic: "",
    })
    .expect(400);
});

it("returns 201 if successful", async () => {
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
});

it("returns spot if successful", async () => {
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
});
