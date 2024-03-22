import {
  isUserExists,
  createUser,
  signInUser,
  logOutUser,
  updateUser,
} from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import crypto from "crypto";
import * as path from "node:path";
import fs from "fs/promises";

export const signupUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await isUserExists(email);
    if (user) {
      throw HttpError(409, "email in use");
    }
    const newUser = await createUser(req.body);
    res.status(201).json({ user: { name, email }, token: newUser.token });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await isUserExists(email);
    if (!user) {
      throw HttpError(401, "email or password is wrong");
    }
    const isPasswordEquals = await user.comparePassword(password);
    if (!isPasswordEquals) {
      throw HttpError(401, "email or password is wrong");
    }
    const updatedUser = await signInUser(user);
    res.status(200).json({
      user: { name: updatedUser.name, email },
      token: updatedUser.token,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  const { id } = req.user;

  try {
    await logOutUser(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const currentUser = (req, res, next) => {
  const { name, email, avatarUrl } = req.user;

  res.send({ name, email, avatarUrl });
};

export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, "No file to upload");
    }

    const { path: tmpPath, originalname } = req.file;
    const newName = `${crypto.randomUUID()}-${originalname}`;
    const newPath = path.join(process.cwd(), "public", "avatars", newName);

    await fs.rename(tmpPath, newPath);

    const avatarUrl = path.join("avatars", newName);

    const user = await updateUser(req.user._id, { avatarUrl });

    res.send(user);
  } catch (error) {
    next(error);
  }
};
