import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Comment } from "../models/comment";
import { requestValidator, auth } from "@spotty/shared";
import { Uri } from "./uris";

const createSpotRouter = express.Router();

createSpotRouter.post(
  Uri.CREATE,
  auth,
  [
    body("spot").notEmpty().withMessage("A spot id has to be provided"),
    body("content")
      .trim()
      .notEmpty()
      .withMessage("A comment has to be provided"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { spot, content } = req.body;

    const username = req.user.username;

    const comment = Comment.build({
      spot,
      username,
      content,
    });

    await comment.save();

    // publish event

    res.status(201).send(comment);
  }
);

export { createSpotRouter };
