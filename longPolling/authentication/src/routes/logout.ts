import express, { Request, Response } from "express";
import {Uri} from "./uris"

const router = express.Router();

router.post(Uri.LOGOUT, async (req: Request, res: Response) => {
  req.session = null;

  res.send({});
});

export { router as logoutRouter };
