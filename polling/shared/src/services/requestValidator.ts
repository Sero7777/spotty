import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import {RequestValidationError} from "../exceptions/RequestValidationException";

const requestValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const exceptions = validationResult(req);

  if (!exceptions.isEmpty()) {
    throw new RequestValidationError(exceptions.array());
  }

  next();
};

export {requestValidator}
