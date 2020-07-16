import express from "express";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { registerRouter } from "./routes/register";

const app = express();

app.use(json());
app.use(cookieSession({ signed: false, secure: false }));
app.use(registerRouter)

export { app };
