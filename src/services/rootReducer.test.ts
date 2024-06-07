import { rootReducer, store } from './store';

describe('Проверка rootReducer', () => {
  test('Проверка на undefined', () => {
    const reducer = store.getState();

    const reducerSecond = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(reducerSecond).toEqual(reducer);
  });
});
