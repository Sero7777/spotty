import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  RouteNotFoundException,
  errorHandler as exceptionHandler,
  getUser
} from "@spotty/shared";

import {createSpotRouter} from "./routes/create"
import {deleteSpotRouter} from "./routes/delete"
import {updateSpotRouter} from "./routes/update"
import {getSingleSpotRouter} from "./routes/getSingle"
import {getAllSpotsRouter} from "./routes/getAll"

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false, httpOnly: false }));
app.use(getUser)

app.use(createSpotRouter)
app.use(deleteSpotRouter)
app.use(updateSpotRouter)
app.use(getSingleSpotRouter)
app.use(getAllSpotsRouter)

app.all("*", async (req: Request, res: Response) => {
  throw new RouteNotFoundException();
});

app.use(exceptionHandler);

export { app };
