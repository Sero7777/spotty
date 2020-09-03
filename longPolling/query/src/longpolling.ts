import { getClients, unsubscribe } from "./routes/getAll";

export const notifyClients = (type: string, payload: any) => {
  var clients = getClients();
  const item = {
    type: type,
    payload: payload,
  };
  clients.forEach((element: any) => {
    unsubscribe(element.reqId);
    console.log(element.res.req!.headers["x-request-id"] + " disconnected");
    element.res.send(item);
  });
};

export enum actions {
  ADD_SPOT = "ADD_SPOT",
  DELETE_SPOT = "DELETE_SPOT",
  UPDATE_SPOT = "UPDATE_SPOT",
}
