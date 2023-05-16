import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    requestGetProducts(state, action) {
      state.loading = true;
    },

    responseGetProducts(state, action) {
      state.loading = false;
      state.data = action.payload;
    },

    addProduct(state, action) {
      const newData = action.payload;
      state.data.push(newData);
    },

    updateProduct(state, action) {
      const newData = state.data.map((item, _) => {
        if (item._id === action.payload._id) {
          console.log("hihi");
          return {
            ...action.payload,
          };
        } else return item;
      });

      state.data = newData;
    },

    deleteProduct(state, action) {
      const newData = state.data.filter(
        (item, _) => item._id !== action.payload.id
      );
      state.data = newData;
    },
  },
});

export const selectDataProduct = (state) => state.product.data;

// Action creators are generated for each case reducer function
export const {
  addProduct,
  requestGetProducts,
  responseGetProducts,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;
