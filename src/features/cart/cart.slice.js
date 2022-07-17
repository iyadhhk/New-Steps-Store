import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  count: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { cartItems } = state;
      const { id, name, imageUrl, price, size } = action.payload;
      const itemSizes = [];
      const existingCartItem = cartItems.find((item) => item.id === id);
      if (existingCartItem) {
        state.cartItems = cartItems.map((item) => {
          if (item.id === id) {
            item.quantity += 1;
            item.itemSizes.push(size);
          }
          return item;
        });
      } else {
        itemSizes.push(size);
        const newItem = { id, name, imageUrl, price, quantity: 1, itemSizes };
        state.cartItems.push(newItem);
      }
      state.count += 1;
      state.total += price;
    },
    removeItemFromCart: (state, action) => {},
  },
});

export const { addItemToCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCount = (state) => state.cart.count;
export const selectTotal = (state) => state.cart.total;

export default cartSlice.reducer;
