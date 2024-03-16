import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";

import { User } from "../db/models/User.js";

const { SECRET_KEY } = process.env;

export const auth = async (req, res, next) => {
  const headerAuth = req.headers.authorization;

  try {
    if (!headerAuth) {
      throw HttpError(401, "Not authorized");
    }

    const [bearer, token] = headerAuth.split(" ", 2);

    if (bearer !== "Bearer") {
      throw HttpError(401, "Not authorized");
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token || token !== user.token) {
      throw HttpError(401, "Not authorized");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
