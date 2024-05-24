import { Note } from "../db/note"
import {NextFunction, Response} from 'express'
import {IUserRequest} from '../types/IUserRequest'

/**
 * Retrieves all notes associated with the authenticated user.
 *
 * @param {IUserRequest} req - The request object containing the authenticated user.
 * @param {Response} res - The response object used to send the notes back to the client.
 * @return {Promise<void>} A promise that resolves when the notes are successfully retrieved and sent back to the client.
 */
export const get = async (req : IUserRequest, res: Response) => {

    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const notes = await Note.findAll({ where: { userId: req.user.id } });
    return res.json(notes);
}

/**
 * Creates a new note with the given title and content associated with the authenticated user.
 *
 * @param {IUserRequest} req - The request object containing the authenticated user.
 * @param {Response} res - The response object used to send the created note back to the client.
 * @param {NextFunction} next - The next function to be called in the middleware chain.
 * @return {Promise<void>} A promise that resolves when the note is successfully created and sent back to the client.
 */
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

/**
 * Updates a note with the given ID, title, and content associated with the authenticated user.
 *
 * @param {IUserRequest} req - The request object containing the authenticated user and the note data.
 * @param {Response} res - The response object used to send the updated note back to the client.
 * @return {Promise<void>} A promise that resolves when the note is successfully updated and sent back to the client.
 */
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

/**
 * Deletes a note with the given ID associated with the authenticated user.
 *
 * @param {IUserRequest} req - The request object containing the authenticated user and the note ID.
 * @param {Response} res - The response object used to send the result back to the client.
 * @return {Promise<void>} A promise that resolves when the note is successfully deleted and a response is sent back to the client.
 */
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