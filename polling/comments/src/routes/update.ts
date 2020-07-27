import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Comment } from "../models/comment";
import {
  CommentNotFoundException,
  auth,
  UnauthorizedException,
  requestValidator,
} from "@spotty/shared";
import { Uri } from "./uris";

const updateCommentRouter = express.Router();

updateCommentRouter.put(
  Uri.UPDATE,
  auth,
  [
    body("content")
      .trim()
      .notEmpty()
      .withMessage("A comment has to be provided"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { id } = req.body;

    const { content } = req.body;

    const comment = await Comment.findById({ id });

    if (!comment) {
      throw new CommentNotFoundException();
    }

    if (comment.username !== req.user!.username) {
      throw new UnauthorizedException();
    }

    comment.set({ content });

    await comment.save();

    // publish

    res.send(comment);
  }
);

export { updateCommentRouter };
