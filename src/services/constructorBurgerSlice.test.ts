import { describe, expect, test } from '@jest/globals';
import {
  addBun,
  addIngredient,
  clearIngredient,
  constructorBurger,
  initialState,
  removeIngredient
} from './constructorBurgerSlice';

const ingredienrData = {
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
};

const bunData = {
  _id: '1',
  name: 'Краторная булка',
  type: 'bun',
  proteins: 13,
  fat: 32,
  carbohydrates: 21,
  calories: 412,
  price: 412,
  image: 'string.png',
  image_mobile: 'string.png',
  image_large: 'string.png',
  __v: 0
};

describe('Проверка слайса constructor', () => {
  test('обработка экшена добавления ингредиента', () => {
    const state = constructorBurger(
      initialState,
      addIngredient(ingredienrData)
    );
    expect(state.ingredients[0]).toEqual(ingredienrData);
  });
  test('обработку экшена удаления ингредиента', () => {
    const initialStateMock = { bun: null, ingredients: [ingredienrData] };
    const state = constructorBurger(
      initialStateMock,
      removeIngredient(ingredienrData)
    );
    expect(state.ingredients).toHaveLength(0);
    expect(state.ingredients[0]).toBeNull;
  });
  test('обработка экшена добавления bun', () => {
    const state = constructorBurger(initialState, addBun(bunData));
    expect(state.bun).toEqual(bunData);
  });
  test('очистка конструктора', () => {
    const initialStateMock = { bun: bunData, ingredients: [ingredienrData] };
    const state = constructorBurger(initialStateMock, clearIngredient());
    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});
