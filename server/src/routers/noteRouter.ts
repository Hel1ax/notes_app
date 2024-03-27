import { Router } from "express";
import {get, post, destroy, update} from '../controllers/noteController'
import { auth } from "../middlewares/authMiddleware";

const noteRouter = Router();
noteRouter.post('/', auth, post)
noteRouter.get('/', auth, get)
noteRouter.delete('/', auth, destroy)
noteRouter.put('/', auth, update)

export default noteRouter