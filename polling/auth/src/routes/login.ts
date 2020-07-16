import express, {Request, Response} from "express"
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post("/api/members/login", async (req: Request, res: Response) => {
    const {email, password} = req.body

    // validate

    // check db if user exists, if not throw an error

    // check if password matches the pw in the db, if not throw an error

    // generate JWT

    // store in session

    // send user back

    res.send({})

})

export {router as loginRouter}