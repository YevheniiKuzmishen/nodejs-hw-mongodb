// import createHttpError from 'http-errors';
import { signup } from '../services/auth.js';

export const signupController = async (req, res) => {
  const newUser = await signup(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully register user',
    data: newUser,
  });
};
