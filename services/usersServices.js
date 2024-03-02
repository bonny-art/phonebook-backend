import { User } from '../db/models/User.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const isUserExists = async email => {
  const user = await User.findOne({ email });
  return user;
};

const signToken = async id => {
  const payload = { id };
  const { SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

export const createUser = async userData => {
  const user = new User({ ...userData });
  await user.hashPassword();
  await user.save();
  const token = await signToken(user._id);
  const newUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
  return newUser;
};
