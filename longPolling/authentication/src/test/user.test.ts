import request from "supertest";
import { app } from "../app";
import { Uri } from "../routes/uris";

it("returns a 200 if successful", async () => {
  const res = await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "users@users.com",
      username: "otto123",
      password: "password",
    })
    .expect(201);

  const cookie = res.get("Set-Cookie");

  await request(app).get(Uri.USER).set("Cookie", cookie).send().expect(200);
});

it("returns userinformation that belongs to the specified token", async () => {
  const res = await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "users@users.com",
      username: "otto123",
      password: "password",
    })
    .expect(201);

  const cookie = res.get("Set-Cookie");

  const res2 = await request(app)
    .get(Uri.USER)
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res2.body.user.username).toEqual("otto123");
});

it("returns null if not authenticated", async () => {
  const res = await request(app).get(Uri.USER).send().expect(200);

  expect(res.body.user).toEqual(null);
});
