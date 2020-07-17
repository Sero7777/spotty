import {app} from "./app";
import mongoose from "mongoose"

const initialize = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("jwt secret is not provided");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("mongo url is not provided");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to Database');
  } catch (err) {
    console.error(err);
  }

  app.listen(4000, () => {
    console.log("Listening on port 4000 ...");
  });
};

initialize()