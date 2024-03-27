import { Dispatch } from "redux";
import { request } from "../utils/http";
import { Action } from "../Types/ActionType";

const BASE_URL = 'note/'

export interface Note {
  id: number
  title: string
  content: string
}

interface NoteState {
    notes: Note[]; 
}

const header = { Authorization: `Bearer ${localStorage.getItem("token")}` }


export const getNotes = () => {
    return async (dispatch : Dispatch) => {
        const res = await request<Note[]>(BASE_URL, 'get', {}, {}, header);
        const notes = Array.isArray(res.message) ? res.message.sort((a, b) => a.id - b.id) : [];
        dispatch({ type: 'GET_NOTES', payload: notes });
    };
}

export const addNote = (title: string, content: string) => {
    return async (dispatch : Dispatch) => {
        const res = await request<Note>(BASE_URL, 'post', { title: title, content: content }, {}, header)
        dispatch({ type: 'ADD_NOTE', payload: res.message });
    };
}
  
export const updateNote = (note : Note) => async (dispatch : Dispatch) => {
    const res = await request<Note>(`${BASE_URL}`, 'put', {id: note.id, title: note.title, content: note.content}, {}, header);
    dispatch({ type: 'UPDATE_NOTE', payload: res.message });
}
  
export const deleteNote = (noteId : number) => async (dispatch : Dispatch) => {
    await request<void>(`${BASE_URL}`, 'delete', { id : noteId }, {}, header);
    dispatch({ type: 'DELETE_NOTE', payload: noteId });
}

export const resetNotes = () => async (dispatch : Dispatch) => {
    dispatch({ type: 'RESET_NOTES', payload: [] });
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
        case 'RESET_NOTES':
            return initialState;
        default:
            return state;
    }
};
  
export default noteReducer;
  