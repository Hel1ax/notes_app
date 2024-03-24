import { Dispatch } from "redux";
import { request } from "../utils/http";
import { Action } from "../Types/ActionType";

const BASE_URL = 'note/'

export interface Note {
  id: number
  title: string
  text: string
}

interface NoteState {
    notes: Note[]; 
}

export const getNotes = () => {
    return async (dispatch : Dispatch) => {
        try {
            const res = await request<Note[]>(BASE_URL + 'get', 'get');
            if (res.success) {
                const notes = Array.isArray(res.message) ? res.message.sort((a, b) => a.id - b.id) : [];
                dispatch({ type: 'GET_NOTES', payload: notes });
            } else{
                throw new Error(JSON.stringify(res.message));
            }
        } catch (error) {
            console.log(error);
        }
    };
}

export const addNote = () => {
    return async (dispatch : Dispatch) => {
        const res = await request<Note>(BASE_URL + 'post', 'post', { title: '', text: '' })
        dispatch({ type: 'ADD_NOTE', payload: res.message });
    };
}
  
export const updateNote = (note : Note) => async (dispatch : Dispatch) => {
    const res = await request<Note>(`${BASE_URL}put`, 'put', note);
    dispatch({ type: 'UPDATE_NOTE', payload: res.message });
}
  
export const deleteNote = (noteId : number) => async (dispatch : Dispatch) => {
    await request<void>(`${BASE_URL}delete`, 'delete', {}, { noteId });
    dispatch({ type: 'DELETE_NOTE', payload: noteId });
}
  
const initialState : NoteState = {
    notes: new Array<Note>()
};
  
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
  