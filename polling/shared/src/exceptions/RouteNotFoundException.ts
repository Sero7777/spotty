import {OwnException} from './OwnException';

export class RouteNotFoundException extends OwnException {
  statusCode = 404;

  constructor() {
    super('Route not found');
  }

  setErrors() {
    return [{ message: 'Route Not Found' }];
  }
}
