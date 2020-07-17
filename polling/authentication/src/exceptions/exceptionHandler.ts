import { Request, Response, NextFunction } from 'express';
import OwnException from './ownException';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof OwnException) {
    return res.status(err.statusCode).send({ errors: err.setErrors() });
  }

  console.error(err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

export default errorHandler
