import { User } from "../db/models/User.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import "dotenv/config";

export const isUserExists = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const signToken = (id) => {
  const payload = { id };
  const { SECRET_KEY } = process.env;
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

export const createUser = async (userData) => {
  const user = new User({
    ...userData,
    avatarUrl: gravatar.url(userData.email),
  });
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

export const logOutUser = async (id) => {
  await User.findByIdAndUpdate(id, { token: "" });
};

export const signInUser = async (user) => {
  const token = await signToken(user._id);
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );
  return updatedUser;
};
