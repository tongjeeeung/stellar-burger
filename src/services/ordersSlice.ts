import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrderByNumberThunk = createAsyncThunk(
  'order/getOrderByNumberApi',
  async (number: number) => await getOrderByNumberApi(number)
);

export const orderBurgerThunk = createAsyncThunk(
  'order/orderBurgerApi',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrdersThunk = createAsyncThunk(
  'order/getOrdersApi',
  getOrdersApi
);

export interface TOrderSlice {
  order: TOrder | null;
  orderId: TOrder[];
  userOrders: TOrder[];
  isLoading: boolean;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: TOrderSlice = {
  order: null,
  orderId: [],
  userOrders: [],
  isLoading: false,
  orderRequest: false,
  orderModalData: null
};

export const ordersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getOrderId: (state) => state.orderId,
    getUserOrders: (state) => state.userOrders,
    getIsLoading: (state) => state.isLoading,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrdersThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getOrdersThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.userOrders = payload;
    });

    builder.addCase(orderBurgerThunk.pending, (state) => {
      state.isLoading = true;
      state.orderRequest = true;
    });
    builder.addCase(orderBurgerThunk.rejected, (state) => {
      state.isLoading = false;
      state.orderRequest = false;
    });
    builder.addCase(orderBurgerThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orderRequest = false;
      state.order = payload.order;
      state.orderModalData = state.order;
    });

    builder.addCase(getOrderByNumberThunk.pending, (state) => {
      state.isLoading = true;
      state.orderRequest = false;
    });
    builder.addCase(getOrderByNumberThunk.rejected, (state) => {
      state.isLoading = false;
      state.orderRequest = false;
    });
    builder.addCase(getOrderByNumberThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orderRequest = false;
      state.orderId = payload.orders;
    });
  }
});

export const { clearData } = ordersSlice.actions;
export const {
  getOrderRequest,
  getOrderModalData,
  getIsLoading,
  getOrder,
  getOrderId,
  getUserOrders
} = ordersSlice.selectors;
export const order = ordersSlice.reducer;
