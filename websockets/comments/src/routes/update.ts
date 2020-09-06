import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Comment, isValidId } from "../models/comment";
import {
  CommentNotFoundException,
  auth,
  UnauthorizedException,
  requestValidator,
} from "@spotty/shared";
import { Uri } from "./uris";
import {natsContainer} from "../nats-container"
import {CommentUpdatedPublisher} from "../publisher/CommentUpdatedPublisher"

const updateCommentRouter = express.Router();

updateCommentRouter.put(
  Uri.UPDATE,
  auth,
  [
    body("id")
      .trim()
      .notEmpty()
      .withMessage("A comment id has to be provided"),
    body("content")
      .trim()
      .notEmpty()
      .withMessage("A comment has to be provided"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const _id = req.body.id;

    if (!isValidId(_id)) throw new CommentNotFoundException()

    const { content } = req.body;

    const comment = await Comment.findById({ _id });

    if (!comment) {
      throw new CommentNotFoundException();
    }

    if (comment.username !== req.user!.username) {
      throw new UnauthorizedException();
    }

    comment.set({ content });

    await comment.save();

    new CommentUpdatedPublisher(natsContainer.client).publish({
        id: comment._id, spot: comment.spot._id, content: comment.content
    })

    res.send(comment);
  }
);

export { updateCommentRouter };
