import { Route, Routes } from "react-router";
import { AuthRoutes, PublicRoutes } from "../routes";
import { Children } from "../types";

export const AppRouter = () => {
  const isAuth = false;
  return (
    <Routes>
      {isAuth &&
        AuthRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      {PublicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
};
