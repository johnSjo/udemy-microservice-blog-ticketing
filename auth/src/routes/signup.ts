import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/BadRequestError';
import { validateRequest } from '../middlewares/validateRequest';
import { User } from '../models/User';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be provided'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 128 })
      .withMessage('Password must be between 8 and 128 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
