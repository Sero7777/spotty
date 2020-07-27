import {OwnException} from './OwnException';

export class SpotNotFoundException extends OwnException {
  statusCode = 404;

  constructor() {
    super('Spot not found');

    Object.setPrototypeOf(this, SpotNotFoundException.prototype);
  }

  setErrors() {
    return [{ message: 'Spot Not Found' }];
  }
}
