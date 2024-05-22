import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredientsApi',
  getIngredientsApi
);

export interface TIngredientsSlice {
  ingredientData: TIngredient[];
  isLoading: boolean;
}

export const initialState: TIngredientsSlice = {
  ingredientData: [],
  isLoading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientData: (state) => state.ingredientData,
    getIsloading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredientsThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.ingredientData = payload;
    });
  }
});

export const { getIngredientData, getIsloading } = ingredientsSlice.selectors;
export const ingredients = ingredientsSlice.reducer;
