import mongoose from "mongoose";
import HttpError from "../helpers/HttpError.js";

export const isValidId = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw HttpError(400, `${req.params.id} is not valid id`);
    }
    next();
  } catch (e) {
    next(e);
  }
};
