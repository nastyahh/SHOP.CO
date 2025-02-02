import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../types";

interface CartItems {
  items: CartItems[];
}

const initialState: CartItems = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.count += action.payload.count;
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
