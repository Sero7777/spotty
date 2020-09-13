import request from "supertest";
import { app } from "../app";
import { Uri } from "../routes/uris";
import { notifyClients } from "../sse";

it("should receive a response if a spot is created", async () => {
    jest.setTimeout(30000);

    const cookie = global.login();

    setTimeout(() => {
        notifyClients("ADD_SPOT", {abd: "def"})
    }, 5000);

    const res  = await request(app)
    .get(Uri.CONNECT)
    .set("x-request-id", "abcdef")
    .set("Cookie", cookie)
    .on("data", data => {
        console.log(data)
    })
    .on("error", error => {
        console.log(error)
    })
  });
