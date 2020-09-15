import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Comment } from "../models/comment";
import {Spot } from "../models/spot"
import { requestValidator, auth, CommentNotFoundException } from "@spotty/shared";
import { Uri } from "./uris";
import {CommentCreatedPublisher} from "../publisher/CommentCreatedPublisher"
import {natsContainer} from "../nats-container"

const createCommentRouter = express.Router();

createCommentRouter.post(
  Uri.CREATE,
  auth,
  [
    body("spotId").trim().notEmpty().withMessage("A spot id has to be provided"),
    body("content")
      .trim()
      .notEmpty()
      .withMessage("A comment has to be provided"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { spotId, content } = req.body;
    const _id = spotId

    const spot = await Spot.findById( _id )

    if (!spot){
        throw new CommentNotFoundException
    }

    const username = req.user!.username;

    const comment = Comment.build({
      spot,
      username,
      content,
    });

    await comment.save();
    const timestamp = Date.now()

    new CommentCreatedPublisher(natsContainer.client).publish({
        id: comment.id, spot: spot._id, content: comment.content, username, timestamp
    })

    res.status(201).send(comment);
  }
);

export { createCommentRouter };
