import { User } from "../db/models/User.js";
import jwt from "jsonwebtoken";

export const isUserExists = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const createUser = async (userData) => {
  const user = new User({ ...userData });
  await user.hashPassword();
  await user.save();
};
