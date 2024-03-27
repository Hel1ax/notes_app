import { Response, NextFunction, Request} from "express";
import { User } from "../db/user";
import jwt from 'jsonwebtoken';
import { IUserRequest } from "helpers/IUserRequest";

export const auth = (req : IUserRequest, res: Response, next: NextFunction) => {
    try{
        console.log('auth');
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
        console.log(req.user.name);
        return next()
    }catch(err){
        return res.status(403).json({ message: 'Unauthorized' });
    }
}