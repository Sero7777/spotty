import express, { Request, Response } from "express";
import { Uri } from "./uris";
import { auth } from "@spotty/shared";
import { subscribe, unsubscribe } from "../sse";

const connectRouter = express.Router();

connectRouter.get(Uri.CONNECT, auth, async (req: Request, res: Response) => {
  const resHeaders = {
    connection: "keep-alive",
    "cache-control": "no-cache",
    "content-Type": "text/event-stream",
  };
  res.set(resHeaders);

  setInterval(() => {
    res.write("data: \n\n");
  }, 55000);

  console.log(res.req!.headers["x-request-id"] + " connected");

  if (
    !res.req!.headers["x-request-id"] ||
    Array.isArray(res.req!.headers["x-request-id"])
  ) {
    throw new Error();
  }

  subscribe(res.req!.headers["x-request-id"], res);

  req.on("close", () => {
    if (
      !res.req!.headers["x-request-id"] ||
      Array.isArray(res.req!.headers["x-request-id"])
    ) {
      throw new Error();
    }
    console.log(res.req!.headers["x-request-id"] + " Connection closed");
    unsubscribe(res.req!.headers["x-request-id"]);
  });
});

export { connectRouter };
