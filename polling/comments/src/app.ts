import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  RouteNotFoundException,
  errorHandler as exceptionHandler,
} from "@spotty/shared";
import {createSpotRouter} from "./routes/create"
import {deleteCommentRouter} from "./routes/delete"
import {updateCommentRouter} from "./routes/update"
import {getSingleCommentRouter} from "./routes/getSingle"
import {getAllCommentsBySpotsRouter} from "./routes/getAll"


const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false, httpOnly: false }));

app.use(createSpotRouter)
app.use(deleteCommentRouter)
app.use(updateCommentRouter)
app.use(getSingleCommentRouter)
app.use(getAllCommentsBySpotsRouter)

app.all("*", async (req: Request, res: Response) => {
  throw new RouteNotFoundException();
});

app.use(exceptionHandler);

export { app };
