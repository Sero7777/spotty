import express, { Request, Response } from "express";
import { Comment } from "../models/comment";
import { Uri } from "./uris";
import {auth} from "@spotty/shared"

const getAllCommentsRouter = express.Router();

getAllCommentsRouter.get(
  Uri.READALL,
  auth, 
  async (req: Request, res: Response) => {
    const comments = await Comment.find({})
    res.send(comments);
  }
);

export { getAllCommentsRouter };
