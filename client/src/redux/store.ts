import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";
import { userSlice } from "./userSlice";

const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefultMiddleware) =>
    getDefultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
