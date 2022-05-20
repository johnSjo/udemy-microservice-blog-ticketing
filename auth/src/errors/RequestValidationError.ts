import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

export class RequestValidationError extends CustomError {
  public statusCode = 400;

  constructor(private _errors: ValidationError[]) {
    super('Validation error');

    // NOTE: only because extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  public serializeErrors() {
    return this._errors.map(({ msg, param }) => ({
      message: msg,
      field: param,
    }));
  }
}
