import { Note } from "../db/note"
import {NextFunction, Response} from 'express'
import {IUserRequest} from '../helpers/IUserRequest'

export const get = async (req : IUserRequest, res: Response) => {

    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const notes = await Note.findAll({ where: { userId: req.user.id } });
    return res.json(notes);
}


export const post = async (req : IUserRequest, res: Response, next : NextFunction) => {
    try{
        const {title, content} = req.body

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const note = await Note.create({
            title,
            content,
            userId: req.user.id
        })

        return res.status(201).json(note)
    }catch (err : any) {
        if (err.errors)
            return res.status(400).send(err.errors[0].message);
        else
            return next(err);
    }
}

export const update = async (req : IUserRequest, res: Response) => {
    const {id, title, content} = req.body
    const note = await Note.findByPk(id)
    if (!note){
        return res.status(404).json({message: 'Note not found'})
    }
    if (note.userId !== req.user!.id){
        return res.status(401).json({message: 'Unauthorized'})
    }
    await note.update({title, content})
    
    return res.json(note) 
}

export const destroy = async (req : IUserRequest, res: Response) => {

    const {id} = req.body
    const note = await Note.findByPk(id)
    
    if (!note){
        return res.status(404).json({message: 'Note not found'})
    }
    if (note.userId !== req.user!.id){
        return res.status(401).json({message: 'Unauthorized'})
    }
    await note.destroy()
    return res.status(204).json({message: 'Note deleted'})
}