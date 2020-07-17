import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import uris from "./uris";

interface User {
  id: string;
  email: string;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const user = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as User;
    req.user = payload;
  } catch (e) {}

  next();
};

const router = express.Router();

router.get(uris.USER, user, async (req: Request, res: Response) => {
  res.send({ user: req.user || null });
});

export { router as userRouter };
