import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  uploadAvatar,
} from "../controllers/usersControllers.js";
import { signupSchema, loginSchema } from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";
import { auth } from "../middlewares/auth.js";

import uploadFiles from "../middlewares/uploadFiles.js";

const userRouter = express.Router();

userRouter.post("/signup", validateBody(signupSchema), signupUser);

userRouter.post("/login", validateBody(loginSchema), loginUser);

userRouter.post("/logout", auth, logoutUser);

userRouter.get("/current", auth, currentUser);

userRouter.patch(
  "/avatar/update",
  auth,
  uploadFiles.single("avatar"),
  uploadAvatar
);

export default userRouter;
