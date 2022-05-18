import { CustomError } from './CustomError';

export class DatabaseConnectionError extends CustomError {
  private _reason = 'Error connecting to database.';

  public statusCode = 500;

  constructor() {
    super('DB Error');

    // NOTE: only because extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  public serializeErrors() {
    return [{ message: this._reason }];
  }
}
