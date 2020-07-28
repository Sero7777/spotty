import { app } from "./app";
import mongoose from "mongoose";
import { natsContainer } from "./nats-container";

const initialize = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("jwt secret is not provided");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("mongo url is not provided");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID is not provided");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL is not provided");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID is not provided");
  }

  try {
    await natsContainer.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsContainer.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsContainer.client.close());
    process.on("SIGTERM", () => natsContainer.client.close());

    // Listener hier upsetten

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
