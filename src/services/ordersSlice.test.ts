import { describe, expect, test } from '@jest/globals';
import {
  getOrderByNumberThunk,
  getOrdersThunk,
  initialState,
  order,
  orderBurgerThunk
} from './ordersSlice';

const orderData = {
  _id: 'string',
  status: 'string',
  name: 'string',
  createdAt: 'string',
  updatedAt: 'string',
  number: 31,
  ingredients: ['1', '2']
};

describe('Проверка слайса order', () => {
  test('обработка экшена получения orderBurgerThunk (pending)', () => {
    const state = order(
      initialState,
      orderBurgerThunk.pending('pending', orderData.ingredients)
    );
    expect(state.isLoading).toBe(true);
    expect(state.orderRequest).toBe(true);
  });
  test('обработка экшена получения orderBurgerThunk (fulfilled)', () => {
    const state = order(
      initialState,
      orderBurgerThunk.fulfilled(
        {
          order: orderData,
          name: '123',
          success: false
        },
        'fulfilled',
        orderData.ingredients
      )
    );
    expect(state.isLoading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.order).toEqual(orderData);
  });
  test('обработка экшена получения заказа по id (pending)', () => {
    const state = order(
      initialState,
      getOrderByNumberThunk.pending('pending', Number(orderData._id))
    );
    expect(state.isLoading).toBe(true);
  });
  test('обработка экшена получения заказа по id (fulfilled)', () => {
    const state = order(
      initialState,
      getOrderByNumberThunk.fulfilled(
        {
          success: true,
          orders: [orderData]
        },
        'fulfilled',
        Number(orderData._id)
      )
    );
    expect(state.isLoading).toBe(false);
    expect(state.orderId[0]).toEqual(orderData);
  });
  test('обработка экшена получения заказов пользователя (pending)', () => {
    const state = order(initialState, getOrdersThunk.pending('pending'));
    expect(state.isLoading).toBe(true);
  });
  test('обработка экшена получения заказов пользователя (fulfilled)', () => {
    const state = order(
      initialState,
      getOrdersThunk.fulfilled([orderData], 'fulfilled')
    );
    expect(state.isLoading).toBe(false);
    expect(state.userOrders[0]).toEqual(orderData);
  });
});
