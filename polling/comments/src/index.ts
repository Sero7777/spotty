import { app } from "./app";
import mongoose from "mongoose";

const initialize = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("jwt secret is not provided");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("mongo url is not provided");
  }
  // check other envs
  // connect to nats as well

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to Database");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000 ...");
  });
};

initialize();
