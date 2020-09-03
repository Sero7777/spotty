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
    if (
      !res.req!.headers["x-request-id"] ||
      Array.isArray(res.req!.headers["x-request-id"])
    ) {
      throw new Error();
    }
    const id = res.req!.headers["x-request-id"]
    subscribe(id, res);
    console.log(id + " connected");

    req.on("close", () => {
        unsubscribe(id)
        console.log(id + " disconnected")
    })
  }
);

export { getAllSpotsRouter, getClients, unsubscribe };
