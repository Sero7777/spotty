import { app } from "../app";
import { notifyClients } from "../sse";
import http from "http";

describe("Testing the connection via server sent events", () => {
  let cookie: any;
  let server: any;
  let sockets: any[] = [];
  let response: any;

  beforeAll(() => {
    server = require("http").Server(app);
    server.listen(3000, () => console.log("server running"));
    server.on("connection", (socket: any) => sockets.push(socket));
    let sockets: any[] = [];

    cookie = global.login();
  });

  afterAll(() => {
    server.close(() => {
      sockets.forEach((sock: any) => {
        sock.destroy();
      });
    });
    // response.connection.close();
  });

  it("should receive a response if a spot is created", async (done) => {
    jest.setTimeout(15000);
    let spotData: any;

    http.get(
      {
        agent: false,
        hostname: "spotty.com",
        path: "/api/query/connect",
        port: 3000,
        headers: {
          "x-request-id": "abcdef",
          Cookie: cookie,
        },
      },
      (res) => {
        res.on("data", (data) => {
          response = res;
          spotData = Buffer.from(data, "base64").toString("utf-8");
          expect(spotData).toBeDefined();
          done();
        });
      }
    );

    setTimeout(() => {
      notifyClients("ADD_SPOT", { abd: "def" });
    }, 5000);
  });
});
