import express, { Request, Response } from "express";
import { Comment } from "../models/comment";
import { Uri } from "./uris";
import { CommentNotFoundException } from "@spotty/shared";

const getSingleCommentRouter = express.Router();

getSingleCommentRouter.get(Uri.READ, async (req: Request, res: Response) => {
  const { id } = req.body;
  const comment = await Comment.findById(id);

  if (!comment) {
    throw new CommentNotFoundException();
  }

  res.send(comment);
});

export { getSingleCommentRouter };
