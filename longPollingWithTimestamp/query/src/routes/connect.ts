import express, { Request, Response } from "express";
import { Uri } from "./uris";
import { auth } from "@spotty/shared";
import { subscribe, unsubscribe } from "../longpolling";

const connectRouter = express.Router();

connectRouter.post(Uri.CONNECT, auth, async (req: Request, res: Response) => {
  if (
    !res.req!.headers["x-request-id"] ||
    Array.isArray(res.req!.headers["x-request-id"])
  ) {
    throw new Error();
  }
  const id = res.req!.headers["x-request-id"];
  subscribe(id, res, req.body.timestamp);
  console.log(id + " connected");

  req.on("close", () => {
    unsubscribe(id);
    console.log(id + " disconnected");
  });
});

export { connectRouter };
