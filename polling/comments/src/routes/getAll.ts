import express, { Request, Response } from "express";
import { Comment } from "../models/comment";
import { Uri } from "./uris";

const getAllCommentsBySpotsRouter = express.Router();

getAllCommentsBySpotsRouter.get(Uri.READALL, async (req: Request, res: Response) => {
  const { id } = req.body;
  const comments = await Comment.find({spot: id});
  res.send(comments);
});

export { getAllCommentsBySpotsRouter };
