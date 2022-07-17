import { createAsyncThunk } from "@reduxjs/toolkit";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const getCategories = createAsyncThunk(
  "categories/getMap",
  async (_, thunkApi) => {
    try {
      return await getCategoriesAndDocuments();
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);
