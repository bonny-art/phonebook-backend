import express from "express";
import { signupUser, loginUser } from "../controllers/usersControllers.js";
import { signupSchema, loginSchema } from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";

const userRouter = express.Router();
//дописати міделвар для валідації боді + протестувати контролер!!!
userRouter.post("/signup", validateBody(signupSchema), signupUser);

userRouter.post("/login", validateBody(loginSchema), loginUser);

userRouter.post("/logout");

userRouter.get("/current");

export default userRouter;
