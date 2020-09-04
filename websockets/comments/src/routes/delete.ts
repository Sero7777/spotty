import express, { Request, Response } from "express";
import {
  auth,
  CommentNotFoundException,
  UnauthorizedException,
} from "@spotty/shared";
import { Comment } from "../models/comment";
import { Uri } from "./uris";
import {CommentDeletedPublisher} from "../publisher/CommentDeletedPublisher"
import {natsContainer} from "../nats-container"

const deleteCommentRouter = express.Router();

deleteCommentRouter.delete(Uri.DELETE, auth, async (req: Request, res: Response) => {
  const _id = req.body.id;
  const comment = await Comment.findById({ _id });

  if (!comment) {
    throw new CommentNotFoundException();
  }

  if (comment.username !== req.user!.username) {
    throw new UnauthorizedException();
  }

  const associatedSpotId = comment.spot._id

  const deletedComment = await Comment.deleteOne({ _id })

  new CommentDeletedPublisher(natsContainer.client).publish({
    id: _id, spot: associatedSpotId
  })

  res.send(deletedComment)
});

export { deleteCommentRouter };
