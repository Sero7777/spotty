import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import {Uri} from "./uris"
import InvalidRequestException from "../exceptions/InvalidRequestException"

const router = express.Router();

router.post(Uri.REGISTER,
  [
    body("email")
        .isEmail()
        .withMessage("Invalid Email"),
    body("username")
        .notEmpty()
        .withMessage("Username has to be prodided"),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must have a length of at least 8 characters"),
  ],
  async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    const userMail = await User.findOne({ email });

    if (userMail) {
      throw new InvalidRequestException("Taken email");
    }

    const userName = await User.findOne({ username });

    if (username) {
      throw new InvalidRequestException("Taken username");
    }

    const user = User.build({ email, username, password });

    await user.save();

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

    res.status(201).send(user);
  }
);

export { router as registerRouter };
