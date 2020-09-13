import { app } from "../app";
import { initSocketIo, notifyClients } from "../websockets";
import ios from 'socket.io-client';

describe("testing connection", () => {
    let io;
    let socket: any;
    let server: any;
    let sockets: any[] = []

    beforeAll(() => {
        server = require("http").Server(app);
        io = require("socket.io")(server);
        server.listen(3000, () => console.log("io server running"))
        server.on("connection", (socket: any) => sockets.push(socket))

        initSocketIo(io)
    })

    afterAll(() => {
        socket.close()
        server.close(() => {
            sockets.forEach((sock: any) => {
                sock.destroy()
            })
        })
    })

    it("should receive a message",(done) => {
        jest.setTimeout(15000)
        let spotsEvent: any;
        socket = ios("http://localhost:3000", {
            transportOptions: {
                polling: {
                  extraHeaders: {
                    'cookie': global.login()
                  }
                }
              }
        })
         
        socket.on("spotUpdated", (data:any) => spotsEvent = data)
        notifyClients("ADD_SPOT", { abc: "def" })

        setTimeout(() => {
            expect(spotsEvent).toBeDefined()
            done()
        }, 2500);
    })
})