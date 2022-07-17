import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categories.service";

const initialState = {
  products: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const selectCategories = (state) => state.categories.products;
export const selectIsLoading = (state) => state.categories.isLoading;
export const selectIsSuccess = (state) => state.categories.isSuccess;

export default categoriesSlice.reducer;
