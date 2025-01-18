import { Route, Routes } from "react-router";
import { AuthRoutes, PublicRoutes } from "../routes";
import Layout from "../Layout";

export const AppRouter = () => {
  const isAuth = false;
  return (
    <Routes>
      {isAuth &&
        AuthRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      <Route path="/" element={<Layout />}>
        {PublicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};
