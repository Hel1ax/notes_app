import {  Response, NextFunction, Request } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../db/user'
import { IUserRequest } from 'helpers/IUserRequest';

// Регистрация нового пользователя
export const signUp = async (req: IUserRequest, res: Response, next: NextFunction) : Promise<Response | void>=> {
    console.log(req.body);
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: `Username, email, and password are required ${name}, ${email}, ${password}` });
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Создаем нового пользователя в базе данных
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY as string); 

        return res.status(200).json({ token });

    } catch (error : any) {
        if (error.errors) {
            return res.status(400).json({ message: error.errors[0]?.message });
        }else{
            return next(error);
        }
    }
};

// Аутентификация пользователя
export const signIn = async (req: IUserRequest, res: Response) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Находим пользователя по email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Проверяем введенный пароль
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Генерируем JWT токен
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string); 

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error signing in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const check = (req: IUserRequest, res: Response) => {
    const {user} = req;
    
    console.log(user);
    return res.status(200).json({name : user?.name});
}

export const signOut = (req: IUserRequest, res: Response) => {
    req.user = undefined;
    res.status(200).json({ message: 'Sign out successful' });
}