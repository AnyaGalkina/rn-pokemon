import {configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {root} from './rootSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';


export const rootReducer = combineReducers({
    root
});

export const store = configureStore({
    reducer: rootReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<AppStateType, unknown, any>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

