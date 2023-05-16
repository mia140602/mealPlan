import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  role: -1,
  token: "",
  isLogin: false,

  response: {
    loading: false,
    error: -1,
    message: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    requestSignIn(state, action) {
      state.response.loading = true;
    },

    responseSignIn(state, action) {
      if (action.payload.data) {
        const { id, email, role } = action.payload.data;
        state.id = id;
        state.email = email;
        state.role = role;

        state.isLogin = true;
      }

      state.response.message = action.payload.message;
      state.response.error = action.payload.error;
      state.response.loading = false;
    },

    updateFromLocalStorage(state, action) {
      const { id, email, role } = action.payload;
      state.id = id;
      state.email = email;
      state.role = role;

      state.isLogin = true;
    },

    logOut(state, action) {
      state.id = "";
      state.email = "";
      state.role = "";
      state.isLogin = false;
      localStorage.removeItem("admin");
    },
  },
});

export const selectIsLogin = (state) => state.user.isLogin;
export const selectResponseUser = (state) => state.user.response;

// Action creators are generated for each case reducer function
export const { requestSignIn, responseSignIn, updateFromLocalStorage, logOut } =
  userSlice.actions;

export default userSlice.reducer;
