import { CustomError } from './CustomError';

export class BadRequestError extends CustomError {
  public statusCode = 400;

  constructor(public message: string) {
    super(message);

    // NOTE: only because extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  public serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
