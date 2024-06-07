import { describe, expect, test } from '@jest/globals';
import {
  forgotPasswordThunk,
  getUserThunk,
  initialState,
  loginUserThunk,
  logoutUserThunk,
  registUserThunk,
  resetPasswordThunk,
  updateUserThunk,
  user
} from './userSlice';

const userData = {
  email: 'string',
  name: 'string'
};

const userLoginData = {
  email: 'string',
  name: 'string',
  password: 'string'
};

describe('Проверка слайса userSlice', () => {
  test('обработка экшена получения user (pending)', () => {
    const state = user(initialState, getUserThunk.pending('pending'));
    expect(state.isAuth).toBe(false);
  });
  test('обработка экшена получения user (fulfilled)', () => {
    const state = user(
      initialState,
      getUserThunk.fulfilled({ user: userData, success: true }, 'fulfilled')
    );
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userData);
  });
  test('обработка экшена регистрации user (pending)', () => {
    const state = user(
      initialState,
      registUserThunk.pending('pending', userLoginData)
    );
    expect(state.isAuth).toBe(false);
  });
  test('обработка экшена регистрации user (fulfilled)', () => {
    const state = user(
      initialState,
      registUserThunk.fulfilled(
        {
          refreshToken: 'string',
          accessToken: 'string',
          user: userData,
          success: true
        },
        'fulfilled',
        userLoginData
      )
    );
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userData);
  });
  test('обработка экшена входа user (pending)', () => {
    const state = user(
      initialState,
      loginUserThunk.pending('pending', userLoginData)
    );
    expect(state.isAuth).toBe(false);
  });
  test('обработка экшена входа user (fulfilled)', () => {
    const state = user(
      initialState,
      loginUserThunk.fulfilled(
        {
          refreshToken: 'string',
          accessToken: 'string',
          user: userData,
          success: true
        },
        'fulfilled',
        userLoginData
      )
    );
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userData);
  });
  test('обработка экшена выхода user (pending)', () => {
    const state = user(initialState, logoutUserThunk.pending('pending'));
    expect(state.isAuth).toBe(true);
  });
  test('обработка экшена выхода user (fulfilled)', () => {
    const state = user(
      initialState,
      logoutUserThunk.fulfilled(undefined, 'fulfilled')
    );
    expect(state.isAuth).toBe(false);
    expect(state.user).toBeNull();
  });
  test('обработка экшена обновления user (pending)', () => {
    const state = user(
      initialState,
      updateUserThunk.pending('pending', userData)
    );
    expect(state.isAuth).toBe(false);
  });
  test('обработка экшена обновления user (fulfilled)', () => {
    const state = user(
      initialState,
      updateUserThunk.fulfilled(
        {
          user: userData,
          success: true
        },
        'fulfilled',
        userData
      )
    );
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userData);
  });
  test('обработка экшена на смену пароля (fulfilled)', () => {
    const state = user(
      initialState,
      forgotPasswordThunk.fulfilled(undefined, 'fulfilled', userData.email)
    );
    expect(state.isAuth).toBe(false);
  });
  test('обработка экшена на cброс пароля (fulfilled)', () => {
    const state = user(
      initialState,
      resetPasswordThunk.fulfilled(
        {
          success: true
        },
        'fulfilled',
        { password: userLoginData.password, token: '2131241241dadwqe213' }
      )
    );
    expect(state.isAuth).toBe(false);
  });
});
