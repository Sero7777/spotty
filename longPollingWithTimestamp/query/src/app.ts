import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  RouteNotFoundException,
  errorHandler as exceptionHandler,
  getUser,
} from "@spotty/shared";

import { getAllSpotsRouter } from "./routes/getAll";
import { getSingleSpotRouter } from "./routes/getOne";
import { connectRouter } from "./routes/connect";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false, httpOnly: false }));
app.use(getUser);

app.use(getAllSpotsRouter);
app.use(getSingleSpotRouter);
app.use(connectRouter);

app.all("*", async (req: Request, res: Response) => {
  throw new RouteNotFoundException();
});

app.use(exceptionHandler);

export { app };
