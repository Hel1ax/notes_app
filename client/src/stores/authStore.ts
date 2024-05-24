import {Response, request} from '../utils/http';
import {Dispatch} from 'redux';
import { Action } from '../types/ActionType';
import { State } from '../types/AuthStateType';

/**
 * Updates the status by sending a POST request to the specified URL with the given data and headers.
 *
 * @param {string} url - The URL to send the request to.
 * @param {object} data - The data to send in the request body.
 * @param {object} headers - The headers to include in the request (optional).
 * @return {Promise<Response<any>>} A promise that resolves to the response from the server.
 */
async function updateStatus(url: string, data: object, headers : object = {}): Promise<Response<any>> {
    const res = await request<any>('user/' + url, 'post', data, {} , headers);
    return res;
}

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
 * Signs in a user by sending a POST request to the server with the provided data.
 *
 * @param {object} data - The data to send in the request body.
 * @param {Dispatch<Action>} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A promise that resolves when the sign-in is successful.
 */
export const signIn = (data : object) => async (dispatch : Dispatch<Action>) : Promise<void> => {
    try{
        const res = await updateStatus('signin', data);

        const token = res.message?.token

        localStorage.setItem('token', token);
        
        dispatch({type: 'SIGN_IN', payload: res.success});

    }catch(err: any){
        console.log(err);
    }
};
  
/**
 * Signs up a user by sending a POST request to the server with the provided data.
 *
 * @param {object} data - The data to send in the request body.
 * @param {Dispatch<Action>} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A promise that resolves when the sign-up is successful.
 */
export const signUp = (data : object) => async (dispatch : Dispatch<Action>) => {
    try{
        const res = await updateStatus('signup', data);
        
        const token = res.message?.token

        localStorage.setItem('token', token);

        dispatch({type: 'SIGN_UP', payload: res.success});

    }catch(err: any){
        console.log(err);
    }
};

/**
 * Authenticates the user by sending a POST request to the server with the provided data.
 *
 * @param {Dispatch<Action>} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A promise that resolves when the authentication is successful.
 */
export const auth = () => async (dispatch : Dispatch<Action>) => {

    const res = await updateStatus('auth', {}, getHeader());

    dispatch({type: 'AUTH', payload: {auth : res.success, name: res.message?.name}});
};

/**
 * Signs out the user by sending a request to the server and removing the token from local storage.
 *
 * @param {Dispatch<Action>} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A promise that resolves when the sign-out is successful.
 */
export const signOut = () => async (dispatch : Dispatch<Action>) => {
    const res = await updateStatus('signout', {});
    localStorage.removeItem('token');
    dispatch({type: 'SIGN_OUT', payload: res.success});
};


const initialState : State = {
    name: '',
    isAuthorized: false,
    isInitializing: false
};

/**
 * Reducer function for handling authentication actions.
 *
 * @param {State} state - The current state of the authentication reducer.
 * @param {Action} action - The action to be processed.
 * @return {State} The new state of the authentication reducer.
 */
const authReducer = (state = initialState, action : Action) => {
    switch (action.type) {

        case 'SIGN_IN':
            return {...state, isInitializing: action.payload};

        case 'SIGN_UP':
            return {...state, isInitializing: action.payload};

        case 'AUTH':
            return {...state, name: action.payload.name,  isInitializing: false, isAuthorized: action.payload.auth};

        case 'SIGN_OUT':
            return {...state, isAuthorized: !action.payload};

        default:
            return state;
    }
};

export default authReducer;
  