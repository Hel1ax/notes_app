import {Response, request} from '../utils/http';
import {Dispatch} from 'redux';
import { Action } from '../Types/ActionType';
import { State } from '../Types/AuthStateType';

async function updateStatus(url: string, data: object, headers : object = {}): Promise<Response<any>> {
    const res = await request<any>('user/' + url, 'post', data, {} , headers);
    return res;
}

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
  
export const signUp = (data : object) => async (dispatch : Dispatch<Action>) => {
    try{
        const res = await updateStatus('signup', data);
        
        const token = res.message?.token as string

        localStorage.setItem('token', token);

        dispatch({type: 'SIGN_UP', payload: res.success});

    }catch(err: any){
        console.log(err);
    }
};

export const auth = () => async (dispatch : Dispatch<Action>) => {

    const res = await updateStatus('auth', {}, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    });

    console.log(res.success);

    dispatch({type: 'AUTH', payload: res.success});
};
  
export const signOut = () => async (dispatch : Dispatch<Action>) => {
    const res = await updateStatus('signout', {});
    localStorage.removeItem('token');
    dispatch({type: 'SIGN_OUT', payload: res.success});
};


const initialState : State = {
    isAuthorized: false,
    isInitializing: false
};
  
const authReducer = (state = initialState, action : Action) => {
    switch (action.type) {

        case 'SIGN_IN':
            return {...state, isInitializing: action.payload};

        case 'SIGN_UP':
            return {...state, isInitializing: action.payload};

        case 'AUTH':
            return {...state, isInitializing: !action.payload, isAuthorized: action.payload};

        case 'SIGN_OUT':
            return {...state, isAuthorized: !action.payload};

        default:
            return state;
    }
};

export default authReducer;
  