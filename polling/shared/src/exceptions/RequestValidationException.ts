import { ValidationError } from 'express-validator';
import {OwnException} from './OwnException';

export class RequestValidationError extends OwnException {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request');
  }

  setErrors() {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param };
    });
  }
}
