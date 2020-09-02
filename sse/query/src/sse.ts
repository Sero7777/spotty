import { getClients } from "./routes/getAll";

export const notifyClients = (type: string, payload: any) => {
    var clients = getClients()
    const item = {
        type: type,
        payload: payload
    }
    clients.forEach((element: any) => {
        element.res.write("data: " + JSON.stringify(item) + "\n\n")
    });
}

export enum actions {
    ADD_SPOT = "ADD_SPOT",
    DELETE_SPOT = "DELETE_SPOT",
    UPDATE_SPOT = "UPDATE_SPOT",
}