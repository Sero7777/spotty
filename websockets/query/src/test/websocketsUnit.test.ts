import { getToken, verifyToken } from "../websockets";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

describe("unit testing functions", () => {
    let mockedSocket: any;

    beforeAll(() => {
        mockedSocket = {
            handshake: {
              headers: {
                cookie:
                    global.login()[0],
              },
            },
          };
    })


it("should return a jwt if valid token present", () => {
    const token = getToken(mockedSocket);
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });
  
  it("should return a jwt that consits of three parts", () => {
    const token = getToken(mockedSocket).split(".");
    expect(token.length).toBe(3);
  });
  
  it("should return true if provided token is verified and valid", async () => {
    process.env.JWT_SECRET = "Rabarbarkuchensalat123456";
    const userJwt = jwt.sign(
      {
        id: mongoose.Types.ObjectId().toHexString(),
        username: "abcdefg",
      },
      process.env.JWT_SECRET
    );
  
    const result = verifyToken(userJwt);
    expect(result).toBe(true);
  });
  
  it("should return false if provided token is verified and invalid", async () => {
      process.env.JWT_SECRET = "Rabarbarkuchensalat123456";
      const userJwt = jwt.sign(
        {
          id: mongoose.Types.ObjectId().toHexString(),
          username: "abcdefg",
        },
        process.env.JWT_SECRET
      );
  
      const invalidJwt = userJwt.slice(-2, -1)
    
      const result = verifyToken(invalidJwt);
      expect(result).toBe(false);
  });
})

