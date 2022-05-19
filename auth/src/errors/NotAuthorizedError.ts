import { CustomError } from './CustomError';

export class NotAuthorizedError extends CustomError {
  public statusCode = 401;

  constructor() {
    super('Not Authorized!');

    // NOTE: only because extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: 'Not Authorized!',
      },
    ];
  }
}
