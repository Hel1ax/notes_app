import { Response, NextFunction, Request} from "express";
import { User } from "../db/user";
import jwt from 'jsonwebtoken';
import { IUserRequest } from "types/IUserRequest";

/**
 * Middleware function for authentication.
 *
 * @param {IUserRequest} req - The request object containing user information.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @return {void} This function does not return anything.
 */
export const auth = (req : IUserRequest, res: Response, next: NextFunction) => {
    try{

        if (req.method == 'OPTIONS')
            return next();

        const token = req.headers.authorization?.split(' ')[1];
        if (!token){
            return res.status(402).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as User;

        if (!decoded){
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded;
        return next()
    }catch(err){
        return res.status(403).json({ message: 'Unauthorized' });
    }
}