import express, { Request, Response } from "express";
import {Uri} from "./uris";
import {getUser} from "@spotty/shared"

const router = express.Router();

router.get(Uri.USER, getUser, async (req: Request, res: Response) => {
  res.send({ user: req.user || null });
});

export { router as userRouter };
