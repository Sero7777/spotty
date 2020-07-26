import express, { Request, Response } from "express";
import {
  auth,
  CommentNotFoundException,
  UnauthorizedException,
} from "@spotty/shared";
import { Comment } from "../models/comment";
import { Uri } from "./uris";

const deleteCommentRouter = express.Router();

deleteCommentRouter.delete(Uri.DELETE, auth, async (req: Request, res: Response) => {
  const { id } = req.body;
  const comment = await Comment.findById({ id });

  if (!comment) {
    throw new CommentNotFoundException();
  }

  if (comment.username !== req.user.username) {
    throw new UnauthorizedException();
  }

  const deletedSpot = await Comment.deleteOne({ id })

  // publish event

  res.send(deletedSpot)
});

export { deleteCommentRouter };
