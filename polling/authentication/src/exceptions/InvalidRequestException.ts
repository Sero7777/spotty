import OwnException from './OwnException';

export default class BadRequestError extends OwnException {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
  }

  setErrors() {
    return [{ message: this.message }];
  }
}
