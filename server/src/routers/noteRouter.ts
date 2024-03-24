import { Router } from "express";
import {get, post, destroy, update} from '../controllers/noteController'

const noteRouter = Router();
noteRouter.post('/post', post)
noteRouter.get('/get', get)
noteRouter.delete('/delete', destroy)
noteRouter.put('/put', update)

export default noteRouter