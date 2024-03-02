import { isUserExists, createUser } from '../services/usersServices.js';
import HttpError from '../helpers/HttpError.js';

export const signupUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await isUserExists(email);
    if (user) {
      throw HttpError(409, 'email in use');
    }
    const newUser = await createUser(req.body);
    res.status(201).json({ user: { name, email }, token: newUser.token });
  } catch (error) {
    next(error);
  }
};

// const loginUser = async (req, res, next) => {};

// const logoutUser = async (req, res, next) => {};

// const currentUser = async (req, res, next) => {};
