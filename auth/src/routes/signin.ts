import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError, validateRequest } from '@johnsjo_ed_tickets/common';
import { User } from '../models/User';
import { compare } from '../utils/hash';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be provided'),
    body('password').trim().notEmpty().withMessage('Password must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('Invalid credentials.');
    }

    const passwordsMatch = await compare(user.password, password);

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials.');
    }

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(200).send(user);
  }
);

export { router as signinRouter };
