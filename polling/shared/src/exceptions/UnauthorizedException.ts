import {OwnException} from "./OwnException"

export class UnauthorizedException extends OwnException {
  statusCode = 401;

  constructor() {
    super('Unauthorized');
  }

  setErrors() {
    return [{ message: 'Not authorized' }];
  }
}
