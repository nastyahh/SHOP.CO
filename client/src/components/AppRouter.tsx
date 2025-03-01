import { Route, Routes } from "react-router";
import { AuthRoutes, PublicRoutes } from "../routes";
import Layout from "../Layout";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {AuthRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {PublicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};
