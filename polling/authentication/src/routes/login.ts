import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import {Uri} from "./uris"
import InvalidRequestException from "../exceptions/InvalidRequestException"

const router = express.Router();

router.post(Uri.LOGIN,
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").trim().notEmpty().withMessage("Empty Password"),
  ],
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new InvalidRequestException("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new InvalidRequestException("Invalid Credentials");
    }

    const userJwt = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(user);
  }
);

export { router as loginRouter };
