import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { user } from './userSlice';
import { playlists } from './playlistsSlice';
import { current } from './currentSlice';
import { popular } from './popularSlice';
import { blog } from './blogSlice';
import { executor } from './executorSlice';

export const rootReducer = combineReducers({
  user: user,
  playlists: playlists,
  current: current,
  popular: popular,
  blog: blog,
  executor: executor,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;