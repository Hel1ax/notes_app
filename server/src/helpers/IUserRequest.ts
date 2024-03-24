import { Request } from "express"
import {User} from "../db/user"

export interface IUserRequest extends Request {
  user?: User 
}