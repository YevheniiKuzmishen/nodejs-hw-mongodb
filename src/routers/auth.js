import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import { userSigninSchema, userSignupSchema } from '../validation/users.js';
import {
  signupController,
  signinController,
  refreshController,
  signoutController,
} from '../controllers/auth.js';

export const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);

authRouter.post(
  '/signin',
  validateBody(userSigninSchema),
  ctrlWrapper(signinController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));

authRouter.post('/signout', ctrlWrapper(signoutController));
