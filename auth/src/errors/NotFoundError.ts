import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route not found.');

    // NOTE: only because extending a built in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  public serializeErrors() {
    return [{ message: 'Not found' }];
  }
}
