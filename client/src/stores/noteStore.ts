import { Dispatch } from "redux";
import { request } from "../utils/http";
import { Action } from "../types/ActionType";
import { Note } from "types/Notes";

const BASE_URL = 'note/'

interface NoteState {
    notes: Note[]; 
}

const initialState : NoteState = {
    notes: new Array<Note>()
};
  
/**
 * Returns an object containing an Authorization header with a Bearer token 
 * retrieved from local storage.
 *
 * @return {object} An object with the Authorization header.
 */
const getHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

/**
 * Fetches notes from the server and dispatches an action to update the state with the fetched notes.
 *
 * @return {Promise<void>} A promise that resolves when the notes are fetched and dispatched.
 */
export const getNotes = () => {
    return async (dispatch : Dispatch) => {
        
        const res = await request<Note[]>(BASE_URL, 'get', {}, {}, getHeader());
        const notes = Array.isArray(res.message) ? res.message.sort((a, b) => a.id - b.id) : [];

        dispatch({ type: 'GET_NOTES', payload: notes });
    };
}

/**
 * Creates a new note with the given title and content and dispatches an action to add it to the state.
 *
 * @param {string} title - The title of the note.
 * @param {string} content - The content of the note.
 * @return {Promise<void>} A promise that resolves when the note is added to the state.
 */
export const addNote = (title: string, content: string) => {
    return async (dispatch : Dispatch) => {
        const res = await request<Note>(BASE_URL, 'post', { title: title, content: content }, {}, getHeader())
        dispatch({ type: 'ADD_NOTE', payload: res.message });
    };
}

/**
 * Updates a note by sending a PUT request to the server with the provided note data.
 *
 * @param {Note} note - The note object to be updated.
 * @param {Dispatch} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A promise that resolves when the note is successfully updated.
 */
export const updateNote = (note : Note) => async (dispatch : Dispatch) => {
    const res = await request<Note>(`${BASE_URL}`, 'put', {id: note.id, title: note.title, content: note.content}, {}, getHeader());
    dispatch({ type: 'UPDATE_NOTE', payload: res.message });
}

/**
 * Deletes a note with the specified ID by sending a DELETE request to the server.
 *
 * @param {number} noteId - The ID of the note to be deleted.
 * @param {Dispatch} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A promise that resolves when the note is successfully deleted.
 */
export const deleteNote = (noteId : number) => async (dispatch : Dispatch) => {
    await request<void>(`${BASE_URL}`, 'delete', { id : noteId }, {}, getHeader());
    dispatch({ type: 'DELETE_NOTE', payload: noteId });
}

/**
 * Reducer function for managing note-related state changes.
 *
 * @param {NoteState} state - The current state of the note reducer.
 * @param {Action} action - The action to be processed.
 * @return {NoteState} The new state of the note reducer.
 */
const noteReducer = (state = initialState, action : Action) : NoteState => {
    switch (action.type) {
        case 'GET_NOTES':
            return { ...state, notes: action.payload };
        case 'ADD_NOTE':
            return { ...state, notes: [...state.notes, action.payload] };
        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.payload.id ? action.payload : note
                )
            };
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            };
        default:
            return state;
    }
};
  
export default noteReducer;
  