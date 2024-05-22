import {
  TLoginData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

//снос пароля
export const forgotPasswordThunk = createAsyncThunk(
  'user/forgotPasswordApi',
  async (email: string) => {
    await forgotPasswordApi({ email });
  }
);

//смена пароля
export const resetPasswordThunk = createAsyncThunk(
  'user/resetPasswordApi',
  async (data: { password: string; token: string }) =>
    await resetPasswordApi(data)
);

//получение пользователя
export const getUserThunk = createAsyncThunk('user/getUserApi', getUserApi);

//рега
export const registUserThunk = createAsyncThunk(
  'user/registerUserApi',
  registerUserApi
);

//вход
export const loginUserThunk = createAsyncThunk(
  'user/loginUserApi',
  async (data: TLoginData) => {
    const log = await loginUserApi(data);
    setCookie('accessToken', log.accessToken);
    localStorage.setItem('refreshToken', log.refreshToken);
    return log;
  }
);

//выход:)
export const logoutUserThunk = createAsyncThunk(
  'user/logoutUserApi',
  async function () {
    logoutApi().then(() => {
      localStorage.clear();
      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');
    });
  }
);

//обновление
export const updateUserThunk = createAsyncThunk(
  'user/updateUserApi',
  updateUserApi
);

export interface UserState {
  isAuth: boolean;
  user: TUser | null;
}

const initialState: UserState = {
  isAuth: false,
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = { name: '', email: '' };
      state.isAuth = false;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuth: (state) => state.isAuth
  },
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.user = payload.user;
    });

    builder.addCase(registUserThunk.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(registUserThunk.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(registUserThunk.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.user = payload.user;
    });

    builder.addCase(loginUserThunk.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.user = payload.user;
    });

    builder.addCase(logoutUserThunk.pending, (state) => {
      state.isAuth = true;
    });
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.isAuth = true;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.isAuth = false;
      state.user = null;
    });

    builder.addCase(updateUserThunk.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(updateUserThunk.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, { payload }) => {
      state.isAuth = true;
      state.user = payload.user;
    });

    builder.addCase(forgotPasswordThunk.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(forgotPasswordThunk.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(forgotPasswordThunk.fulfilled, (state) => {
      state.isAuth = false;
    });

    builder.addCase(resetPasswordThunk.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(resetPasswordThunk.rejected, (state) => {
      state.isAuth = false;
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state) => {
      state.isAuth = false;
    });
  }
});

export const { logOutUser } = userSlice.actions;
export const { getUser, getIsAuth } = userSlice.selectors;
export const user = userSlice.reducer;
