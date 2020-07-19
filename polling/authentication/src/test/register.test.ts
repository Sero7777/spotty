import request from "supertest";
// const request = require("supertest");
import { app } from "../app";
import { Uri } from "../routes/uris";

// TODO:  FIX ALL QUOTATION MARKS

it("returns a 201 on successful registration", async () => {
  return request(app)
    .post(Uri.REGISTER)
    .send({
      email: "test@test.com",
      password: "password",
      username: "user123",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post(Uri.REGISTER)
    .send({
      email: "abc",
      password: "password",
      username: "user123",
    })
    .expect(400);
});

it("returns a 400 with an invalid username", async () => {
  return request(app)
    .post(Uri.REGISTER)
    .send({
      email: "abc",
      password: "password",
      username: "",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post(Uri.REGISTER)
    .send({
      email: "abc",
      password: "pass",
      username: "user123",
    })
    .expect(400);
});

it("returns a 400 with missing email, password and username", async () => {
  return request(app).post(Uri.REGISTER).send({}).expect(400);
});

it("returns a 400 with missing email", async () => {
  return request(app)
    .post(Uri.REGISTER)
    .send({
      password: "password",
      username: "user123",
    })
    .expect(400);
});

it("returns a 400 with missing password", async () => {
  return request(app)
    .post(Uri.REGISTER)
    .send({
      email: "abc",
      username: "user123",
    })
    .expect(400);
});

it("returns a 400 with missing username", async () => {
  return request(app)
    .post(Uri.REGISTER)
    .send({
      email: "abc",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with duplicate mail", async () => {
  await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "test@test.com",
      password: "password",
      username: "user123",
    })
    .expect(201);

  await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "test@test.com",
      password: "password",
      username: "user456",
    })
    .expect(400);
});

it("returns a 400 with duplicate username", async () => {
  await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "test@test.com",
      password: "password",
      username: "user123",
    })
    .expect(201);

  await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "test2@test.com",
      password: "password",
      username: "user123",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post(Uri.REGISTER)
    .send({
      email: "test@test.com",
      password: "password",
      username: "user123",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
