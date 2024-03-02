import { isUserExists } from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
const signupUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await isUserExists(email);
    if (user) {
      throw HttpError(409, "email in use");
    }
  } catch (error) {
    next(error);
  }
};

// const loginUser = async (req, res, next) => {};

// const logoutUser = async (req, res, next) => {};

// const currentUser = async (req, res, next) => {};
