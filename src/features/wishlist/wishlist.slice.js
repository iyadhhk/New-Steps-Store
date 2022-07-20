import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
  itemsRef: [],
  count: 0,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlistItems.push(action.payload);
      state.itemsRef.push(action.payload.id);
      state.count += 1;
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.wishlistItems = state.wishlistItems.filter((item) => item.id !== id);
      state.itemsRef = state.itemsRef.filter((ref) => ref !== id);
      state.count -= 1;
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishListItems = (state) => state.wishlist.wishlistItems;
export const selectItemsRef = (state) => state.wishlist.itemsRef;
export const selectCountWishlist = (state) => state.wishlist.count;

export default wishlistSlice.reducer;
