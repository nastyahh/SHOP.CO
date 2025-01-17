import { Admin } from "./pages/Admin/Admin";
import { Cart } from "./pages/Cart/Cart";
import { Home } from "./pages/Home/Home";
import { Product } from "./pages/Product/Product";
import {
  ADMIN_ROUTE,
  CART_ROUTE,
  HOME_ROUTE,
  PRODUCT_ROUTE,
} from "./utils/consts";

export const AuthRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: CART_ROUTE,
    Component: Cart,
  },
];

export const PublicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: Product,
  },
];
