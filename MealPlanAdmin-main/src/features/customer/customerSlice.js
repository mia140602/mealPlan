import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    requestGetCustomers(state, action) {
      state.loading = true;
    },

    responseGetCustomers(state, action) {
      state.loading = false;
      state.data = action.payload;
    },

    deleteCustomer(state, action) {
      const newData = state.data.filter(
        (item, _) => item._id !== action.payload
      );
      state.data = newData;
    },
  },
});

export const selectDataCustomer = (state) => state.customer.data;

// Action creators are generated for each case reducer function
export const { requestGetCustomers, deleteCustomer, responseGetCustomers } =
  customerSlice.actions;

export default customerSlice.reducer;
