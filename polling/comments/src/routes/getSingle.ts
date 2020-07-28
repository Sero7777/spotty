import express, { Request, Response } from "express";
import { Comment } from "../models/comment";
import { Uri } from "./uris";
import { CommentNotFoundException, auth } from "@spotty/shared";

const getSingleCommentRouter = express.Router();

getSingleCommentRouter.get(Uri.READ, auth, async (req: Request, res: Response) => {
  const _id = req.body.id;
  const comment = await Comment.findById(_id);

  if (!comment) {
    throw new CommentNotFoundException();
  }

  res.send(comment);
});

export { getSingleCommentRouter };
