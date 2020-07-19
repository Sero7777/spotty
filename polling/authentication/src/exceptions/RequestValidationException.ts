import { ValidationError } from 'express-validator';
import OwnException from './OwnException';

export default class RequestValidationError extends OwnException {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request');
    
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  setErrors() {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param };
    });
  }
}
