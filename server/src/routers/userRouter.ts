import { Router } from "express";
import {signIn, signUp, check, signOut} from '../controllers/userController'
import { auth } from "../middlewares/authMiddleware";

const userRouter = Router();
userRouter.post('/signup', signUp)
userRouter.post('/signin', signIn)
userRouter.use('/auth', auth)
userRouter.post('/auth', check)
userRouter.post('/signout', signOut)

export default userRouter