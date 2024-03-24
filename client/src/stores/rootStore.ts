import { combineReducers } from 'redux';
import authReducer from './authStore';
import noteReducer from './noteStore';
import {thunk} from 'redux-thunk';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { ThunkAction, Action } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    auth: authReducer,
    note: noteReducer
});

const middleware: Middleware[] = [thunk as any];

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
