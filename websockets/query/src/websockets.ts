import { Spot } from "./models/spot";
import jwt from "jsonwebtoken";

let io: any;

export const initSocketIo = (ios: any) => {
  io = ios;

  io.on("connect", async (socket: any) => {
    if (!verifyToken(getToken(socket))) {
      socket.disconnect(true);
    } else {
      console.log("A client connected to query server");
      const spots = await Spot.find({});
      socket.emit("spotUpdated", { type: actions.GET_SPOTS, payload: spots });
    }

    socket.on("disconnect", () => console.log("client has disconnected from query server"))
    socket.on("removeclient", () => socket.disconnect(true))
  });
};

export const notifyClients = (type: string, payload: any) => {
  const item = {
    type: type,
    payload: payload,
  };
  io.emit("spotUpdated", item);
};

export enum actions {
  ADD_SPOT = "ADD_SPOT",
  DELETE_SPOT = "DELETE_SPOT",
  UPDATE_SPOT = "UPDATE_SPOT",
  GET_SPOTS = "GET_SPOTS",
}

export const getToken = (socket: any) => {
  const cookies = socket.handshake.headers.cookie;
  if (!cookies) return null

  const index = cookies.indexOf("express:sess")
  if (index === -1) return null

  const encodedToken = cookies.slice(index).split("=")[1].split(";")[0];
  if (!encodedToken.startsWith("ey")) return null;

  return JSON.parse(Buffer.from(encodedToken, "base64").toString("utf-8")).jwt;
};

export const verifyToken = (token: string) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    if (!payload) return false;
  } catch (error) {
    return false;
  }
  return true;
};
