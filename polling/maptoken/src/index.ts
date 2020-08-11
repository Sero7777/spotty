import express, {Request, Response} from "express";
import jwt from "jsonwebtoken"
import { json } from "body-parser";
import fs from "fs"

const app = express()
app.use(json());

app.get("/api/maptoken",async (req: Request, res: Response) => {
    const header = {
        "alg": "ES256",
        "typ": "JWT",
        "kid": "mapIDkey"
    }

    const payload = {
        "iss": "teamID",
        "iat": Date.now() / 1000,
        "exp": (Date.now() / 1000 + 1800)
    }

    await fs.readFile(__dirname + "/auth.p8", async (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            const token = await jwt.sign(payload, data, {header: header})
            res.send(token)
        }
    })
})

app.listen(3000, () => {
    console.log("Listening on port 3000 ...")
})