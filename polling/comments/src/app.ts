import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  RouteNotFoundException,
  errorHandler as exceptionHandler,
  getUser
} from "@spotty/shared";

import {createCommentRouter} from "./routes/create"
import {deleteCommentRouter} from "./routes/delete"
import {updateCommentRouter} from "./routes/update"
import {getSingleCommentRouter} from "./routes/getSingle"
import {getAllCommentsRouter} from "./routes/getAll"

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false, httpOnly: false }));
app.use(getUser)

app.use(createCommentRouter)
app.use(deleteCommentRouter)
app.use(updateCommentRouter)
app.use(getSingleCommentRouter)
app.use(getAllCommentsRouter)

app.all("*", async (req: Request, res: Response) => {
  throw new RouteNotFoundException();
});

app.use(exceptionHandler);

export { app };
