import express, { Request, Response } from "express";
import uri from "./uris"

const router = express.Router();

router.post(uri.LOGOUT, async (req: Request, res: Response) => {
  req.session = null;

  res.send({});
});

export { router as logoutRouter };
