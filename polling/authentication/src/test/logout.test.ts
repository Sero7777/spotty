import request from "supertest";
import { app } from "../app";
import { Uri } from "../routes/uris";

it("returns a 200 if signout was successful", async () => {
  await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "testo@testo.de",
      username: "otto123",
      password: "password",
    })
    .expect(201);

  const response = await request(app).post(Uri.LOGOUT).send({}).expect(200);
});

it("removes the cookie after signing out", async () => {
  await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "testo@testo.de",
      username: "otto123",
      password: "password",
    })
    .expect(201);

  const res = await request(app).post(Uri.LOGOUT).send({}).expect(200);

  expect(res.get("Set-Cookie")[0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
});