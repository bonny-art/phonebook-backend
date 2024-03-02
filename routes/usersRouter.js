import express from 'express';
import { signupUser } from '../controllers/usersControllers.js';

const userRouter = express.Router();
//дописати міделвар для валідації боді + протестувати контролер!!!
userRouter.post('/signup', signupUser);

userRouter.post('/login');

userRouter.post('/logout');

userRouter.get('/current');

export default userRouter;
