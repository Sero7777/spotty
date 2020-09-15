import { Response } from "express";
import {Spot} from "./models/spot"

export let clients: any = [];

export const subscribe = (reqId: string, res: Response, timestamp: number) => {
  clients.push({ reqId, res, timestamp });
};

export const unsubscribe = (reqId: string) => {
  clients = clients.filter((item: any) => item.reqId !== reqId);
};

export const notifyClients = () => {
  clients.forEach(async (element: any) => {
    unsubscribe(element.reqId);
    console.log(element.res.req!.headers["x-request-id"] + " disconnected");
    const spots = await Spot.find({ timestamp: {$gt: element.timestamp} })
    element.res.send({spots, timestamp: Date.now()});
  });
}