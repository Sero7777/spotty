import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import app from "../app";
import uris from "../routes/uris"

declare global {
  namespace NodeJS {
    interface Global {
      login(): Promise<string[]>;
    }
  }
}

let mongo: any;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.login = async () => {

  const response = await request(app).post(uris.REGISTER).send({
    email: "user@user.com",
    password: "test1234",
    username: "user1234"
  }).expect(201)

  const cookie = response.get('Set-Cookie');

  return cookie;
}