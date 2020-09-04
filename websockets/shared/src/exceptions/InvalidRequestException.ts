import {OwnException} from "./OwnException";

export class InvalidRequestException extends OwnException {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, InvalidRequestException.prototype);
  }

  setErrors() {
    return [{ message: this.message }];
  }
}
