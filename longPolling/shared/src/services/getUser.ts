import {Request,  Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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

const getUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET!) as User;
    req.user = payload;
  } catch (e) {}

  next();
};

export {getUser}