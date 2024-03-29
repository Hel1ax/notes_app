import {  Response, NextFunction, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db/user'
import { IUserRequest } from 'types/IUserRequest';

export const signUp = async (req: IUserRequest, res: Response, next: NextFunction) : Promise<Response | void>=> {
    
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: `Username, email, and password are required ${name}, ${email}, ${password}` });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        const token = jwt.sign({ id: newUser.id, name: newUser.name }, process.env.SECRET_KEY as string); 

        return res.status(200).json({ token });

    } catch (error : any) {
        if (error.errors) {
            return res.status(400).json({ message: error.errors[0]?.message });
        }else{
            return next(error);
        }
    }
};

export const signIn = async (req: IUserRequest, res: Response) => {
    
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email } });;
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET_KEY as string); 

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error signing in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const check = (req: IUserRequest, res: Response) => {
    const {user} = req;
    
    return res.status(200).json({name : user?.name});
}

export const signOut = (req: IUserRequest, res: Response) => {
    res.status(200).json({ message: 'Sign out successful' });
}