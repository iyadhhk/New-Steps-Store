import { createSlice } from "@reduxjs/toolkit";
import { login, loginWithGoogle, logout, registerUser } from "./auth.service";

const initialState = {
  currentUser: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  actionType: "",
};

const authPending = (state, action) => {
  state.actionType = action.type.split("/")[1];
  state.isSuccess = false;
  state.isError = false;
  state.errorMessage = "";
  state.isLoading = true;
};
const authFulfilled = (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.errorMessage = "";
  state.isSuccess = true;
  state.currentUser = { ...action.payload };

  // state.currentUser = action.payload;
};
const authRejected = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.errorMessage = action.payload;
  state.currentUser = null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, authPending)
      .addCase(registerUser.fulfilled, authFulfilled)
      .addCase(registerUser.rejected, authRejected)
      .addCase(loginWithGoogle.pending, authPending)
      .addCase(loginWithGoogle.fulfilled, authFulfilled)
      .addCase(loginWithGoogle.rejected, authRejected)
      .addCase(login.pending, authPending)
      .addCase(login.fulfilled, authFulfilled)
      .addCase(login.rejected, authRejected)
      .addCase(logout.pending, authPending)
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentUser = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { setCurrentUser } = authSlice.actions;

export const selectUser = (state) => state.auth.currentUser;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsSuccess = (state) => state.auth.isSuccess;
export const selectIsError = (state) => state.auth.isError;
export const selectErrorMessage = (state) => state.auth.errorMessage;
export const selectActionType = (state) => state.auth.actionType;

export default authSlice.reducer;
