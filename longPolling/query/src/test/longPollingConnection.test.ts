import request from "supertest";
import { app } from "../app";
import { Uri } from "../routes/uris";
import { notifyClients } from "../longpolling";

it("should receive a response if a spot is created", async () => {
  jest.setTimeout(30000);

  const cookie = global.login();

  setTimeout(() => {
    notifyClients("ADD_SPOT", { abc: "def" });
  }, 3000);

  const response = await request(app)
    .get(Uri.CONNECT)
    .set("x-request-id", "abcdef")
    .set("Cookie", cookie)
    .send();

  expect(response.body).toBeDefined();
});
