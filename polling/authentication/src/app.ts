import express, {Request, Response} from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { registerRouter } from "./routes/register";
import { loginRouter } from "./routes/login";
import { logoutRouter } from "./routes/logout";
import { userRouter } from "./routes/user"
import 'express-async-errors';
import exceptionHandler from "./exceptions/exceptionHandler"
import RouteNotFoundException from "./exceptions/RouteNotFoundException"

const app = express();

app.use(json());
app.use(cookieSession({ signed: false, secure: false }));
app.use(registerRouter);
app.use(loginRouter);
app.use(logoutRouter)
app.use(userRouter)
app.use(exceptionHandler)

app.all('*', async (req: Request, res: Response) => {
    throw new RouteNotFoundException();
  });

export default app;
