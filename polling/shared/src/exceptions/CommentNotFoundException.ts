import {OwnException} from './OwnException';

export class CommentNotFoundException extends OwnException {
  statusCode = 404;

  constructor() {
    super('Comment not found');
  }

  setErrors() {
    return [{ message: 'Comment Not Found' }];
  }
}
