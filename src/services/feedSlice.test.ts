import { describe, expect, test } from '@jest/globals';
import { feed, feedApi, initialState } from './feedSlice';

const feedData = {
  orders: [
    {
      _id: 'string',
      status: 'string',
      name: 'string',
      createdAt: 'string',
      updatedAt: 'string',
      number: 31,
      ingredients: ['1', '2']
    }
  ],
  success: true,
  total: 100,
  totalToday: 5151
};

describe('Проверка слайса feed', () => {
  test('обработка экшена получения feed (pending)', () => {
    const state = feed(initialState, feedApi.pending('pending'));
    expect(state.isLoading).toBe(true);
  });
  test('обработка экшена получения feed (fulfilled)', () => {
    const state = feed(initialState, feedApi.fulfilled(feedData, 'fulfilled'));
    expect(state.isLoading).toBe(false);
    expect(state.feed).toEqual(feedData);
  });
});
