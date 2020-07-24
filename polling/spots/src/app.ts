import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  RouteNotFoundException,
  errorHandler as exceptionHandler,
} from "@spotty/shared";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false, httpOnly: false }));
// routes

app.all("*", async (req: Request, res: Response) => {
  throw new RouteNotFoundException();
});

app.use(exceptionHandler);

export { app };
