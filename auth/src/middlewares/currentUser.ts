import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface IUserPayload {
  email: string;
  id: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

export function currentUser(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.JWT_KEY!
    ) as IUserPayload;

    req.currentUser = payload;
  } catch (err) {
    console.log(err);
  }

  next();
}
