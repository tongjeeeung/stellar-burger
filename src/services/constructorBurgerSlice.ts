import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const ConstructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (ing) => ing.id !== action.payload._id
      );
    },
    clearIngredient: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun
  }
});

export const { getBun, getIngredients } = ConstructorBurgerSlice.selectors;
export const { addBun, addIngredient, removeIngredient, clearIngredient } =
  ConstructorBurgerSlice.actions;
export const constructorBurger = ConstructorBurgerSlice.reducer;
