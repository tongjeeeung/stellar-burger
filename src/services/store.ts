import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { user } from './userSlice';
import { feed } from './feedSlice';
import { constructorBurger } from './constructorBurgerSlice';
import { ingredients } from './ingredientsSlice';
import { order } from './ordersSlice';

const rootReducer = combineReducers({
  user: user,
  feed: feed,
  constructorBurger: constructorBurger,
  ingredients: ingredients,
  order: order
}); // Заменить на импорт настоящего редьюсера

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
