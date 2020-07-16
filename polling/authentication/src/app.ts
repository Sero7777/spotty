import express from "express"
import { json } from "body-parser"
import cookieSession from "cookie-session"
import { registerRouter } from "./routes/register"
import { loginRouter } from "./routes/login"

const app = express()

app.use(json())
app.use(cookieSession({ signed: false, secure: false }))
app.use(registerRouter)
app.use(loginRouter)

export { app }
