import { Response } from "express";

let clients: any = [];

export const subscribe = (reqId: string, res: Response) => {
  clients.push({ reqId, res });
};

export const unsubscribe = (reqId: string) => {
  clients = clients.filter((item: any) => item.reqId !== reqId);
};

export const notifyClients = (type: string, payload: any) => {
  const item = {
    type: type,
    payload: payload,
  };
  clients.forEach((element: any) => {
    element.res.write("data: " + JSON.stringify(item) + "\n\n");
  });
};

export enum actions {
  ADD_SPOT = "ADD_SPOT",
  DELETE_SPOT = "DELETE_SPOT",
  UPDATE_SPOT = "UPDATE_SPOT",
}
