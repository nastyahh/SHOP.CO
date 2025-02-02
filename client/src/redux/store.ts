import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import { userSlice } from "./userSlice";
import { cartSlice } from "./cartSlice";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
  middleware: (getDefultMiddleware) =>
    getDefultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
