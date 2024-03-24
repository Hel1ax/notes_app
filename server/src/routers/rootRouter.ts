import { Router } from "express";
import userRouter from "./userRouter";
import noteRouter from "./noteRouter";

const router = Router();
router.use('/note', noteRouter)
router.use('/user', userRouter)

export default router