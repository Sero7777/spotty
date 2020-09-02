import express, { Request, Response } from "express";
import { Spot } from "../models/spot";
import { Uri } from "./uris";
import { auth } from "@spotty/shared";

const getAllSpotsRouter = express.Router();

let clients: any = [];

const subscribe = (reqId: string, res: Response) => {
  clients.push({ reqId, res });
};

const unsubscribe = (reqId: string) => {
  clients = clients.filter((item: any) => item.reqId !== reqId);
};

const getClients = () => clients;

getAllSpotsRouter.get(
  Uri.READALL,
  auth,
  async (req: Request, res: Response) => {
    const spots = await Spot.find({});
    res.send(spots);
  }
);

getAllSpotsRouter.get(
  Uri.CONNECT,
  auth,
  async (req: Request, res: Response) => {
    const resHeaders = {
      connection: "keep-alive",
      "cache-control": "no-cache",
      "content-Type": "text/event-stream",
    };
    res.set(resHeaders);

    setInterval(() => {
        res.write("data: \n\n")
    },55000)

    console.log(res.req!.headers["x-request-id"] + " connected")

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
  }
);

export { getAllSpotsRouter, getClients };
