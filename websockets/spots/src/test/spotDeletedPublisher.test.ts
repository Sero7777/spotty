import { app } from "../app";
import request from "supertest";
import { Uri } from "../routes/uris";
import {natsContainer} from "../nats-container"

it("returns 200 if deletion was sucessful", async () => {
    const res = await request(app)
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
      });
  
    const spot = res.body;
  
    await request(app)
      .delete(Uri.DELETE)
      .set("Cookie", global.login())
      .send({ id: spot.id })
      .expect(200);

    expect(natsContainer.client.publish).toHaveBeenCalled()
  });