import {OwnException} from "./OwnException"

export class UnauthorizedException extends OwnException {
  statusCode = 401;

  constructor() {
    super('Unauthorized');

    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }

  setErrors() {
    return [{ message: 'Not authorized' }];
  }
}
