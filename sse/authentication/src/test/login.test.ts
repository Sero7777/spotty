import request from "supertest";
import { app } from "../app";
import { Uri } from "../routes/uris";

it("returns a 400 if wrong mail is provided", async () => {
  await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "users@users.com",
      username: "otto123",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post(Uri.LOGIN)
    .send({
      email: "userdasdasdasda@user.com",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 if wrong password is provided", async () => {
  await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "users@users.com",
      username: "otto123",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post(Uri.LOGIN)
    .send({
      email: "users@users.com",
      password: "asdjaskjdasljdlasa",
    })
    .expect(400);
});

it("returns a 200 if valid credentials are provided", async () => {
  await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "users@users.com",
      username: "otto123",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post(Uri.LOGIN)
    .send({
      email: "users@users.com",
      password: "password",
    })
    .expect(200);
});

it("returns a cookie if valid credentials are provided", async () => {
  await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "users@users.com",
      username: "otto123",
      password: "password",
    })
    .expect(201);

  const res = await request(app)
    .post(Uri.LOGIN)
    .send({
      email: "users@users.com",
      password: "password",
    })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});
