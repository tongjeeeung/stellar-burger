import { describe, expect, test } from '@jest/globals';
import {
  getIngredientsThunk,
  ingredients,
  initialState
} from './ingredientsSlice';

const ingredientsData = [
  {
    _id: '0',
    name: 'string',
    type: 'string',
    proteins: 12,
    fat: 27,
    carbohydrates: 21,
    calories: 22,
    price: 242,
    image: 'string.png',
    image_large: 'string.png',
    image_mobile: 'string.png',
    id: '0'
  }
];

describe('Проверка слайса ingredients', () => {
  test('обработка экшена получения ингредиентов (pending)', () => {
    const state = ingredients(
      initialState,
      getIngredientsThunk.pending('pending')
    );
    expect(state.isLoading).toBe(true);
  });
  test('обработка экшена получения ингредиентов (fulfilled)', () => {
    const state = ingredients(
      initialState,
      getIngredientsThunk.fulfilled(ingredientsData, 'fulfilled')
    );
    expect(state.isLoading).toBe(false);
    expect(state.ingredientData).toEqual(ingredientsData);
  });
});
