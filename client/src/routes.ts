import { Admin } from "./pages/Admin/Admin";
import { Auth } from "./pages/Auth/Auth";
import { Cart } from "./pages/Cart/Cart";
import { Home } from "./pages/Home/Home";
import { Product } from "./pages/Product/Product";
import { Profile } from "./pages/Profile/Profile";
import {
  ADMIN_ROUTE,
  CART_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PRODUCT_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
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
  {
    path: PROFILE_ROUTE,
    Component: Profile,
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
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];
