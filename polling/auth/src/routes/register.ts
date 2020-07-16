import express from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/members/register", async (req: Request, res: Response) => {
    const {email, password, userName} = req.body;

    // check if someone with this mail or this username exists in db already, if yes throw an error

    // create this user via mongoose.schema

    // save this user to mongoDB

    // create a JWT

    // store it in session

    // send response back with this user as payload
});

export { router as registerRouter };
