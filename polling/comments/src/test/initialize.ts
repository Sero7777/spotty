import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface Global {
      login(): string[];
    }
  }
}

jest.mock('../nats-container');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_SECRET = "Rabarbarkuchensalat123456";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.login = () => {
  const jwt = jsonwebtoken.sign(
    {
      id: new mongoose.Types.ObjectId().toHexString(),
      username: "Otto123",
    },
    process.env.JWT_SECRET!
  );

  const session = JSON.stringify({ jwt });

  const base64 = Buffer.from(session).toString('base64');

  return [`express:sess=${base64}`];
};
