import request from "supertest";
import { app } from "../app";
import { Uri } from "../routes/uris";

it("returns a list of spots", async () => {
  await request(app).post(Uri.CREATE).set("Cookie", global.login()).send({
    title: "This is a test title",
    description: "This is a test description. I hope this will work out well.",
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

  await request(app).post(Uri.CREATE).set("Cookie", global.login()).send({
    title: "This is a test title",
    description: "This is a test description. I hope this will work out well.",
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

  const response = await request(app)
    .get(Uri.READALL)
    .set("Cookie", global.login())
    .send()
    .expect(200);

  expect(response.body.length).toEqual(2);
});
