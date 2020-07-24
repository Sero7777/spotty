import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { registerRouter } from "./routes/register";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { userRouter } from "./routes/user";
import exceptionHandler from "./exceptions/exceptionHandler";
import RouteNotFoundException from "./exceptions/RouteNotFoundException";
import cors from "cors";

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

app.set("trust proxy", true);
app.use(json());
app.use(cors(corsOptions));
app.use(cookieSession({ signed: false, secure: false, httpOnly: false }));
app.use(registerRouter);
app.use(loginRouter);
app.use(logoutRouter);
app.use(userRouter);

app.all("*", async (req: Request, res: Response) => {
  throw new RouteNotFoundException();
});

app.use(exceptionHandler);

export { app };
