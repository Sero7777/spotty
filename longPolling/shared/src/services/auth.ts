import { Request, Response, NextFunction } from 'express';
import {UnauthorizedException} from "../exceptions/UnauthorizedException"

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    throw new UnauthorizedException();
  }

  next();
};
