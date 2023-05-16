import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isFetching: false,
  loading: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    requestGetOrders(state, action) {
      state.loading = true;
    },

    requestFetching(state) {
      state.isFetching = !state.isFetching;
    },

    responseGetOrders(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

export const selectDataOrder = (state) => state.order.data;
export const selectIsFetching = (state) => state.order.isFetching;

// Action creators are generated for each case reducer function
export const { requestGetOrders, responseGetOrders, requestFetching } =
  orderSlice.actions;

export default orderSlice.reducer;
