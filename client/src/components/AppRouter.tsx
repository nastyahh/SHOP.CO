import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes, PublicRoutes } from "../routes";
import Layout from "../Layout";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const AppRouter = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {AuthRoutes.map(({ path, Component }) =>
          isAuth ? (
            <Route key={path} path={path} element={<Component />} />
          ) : (
            <Route path={path} element={<Navigate to="/login" />} />
          )
        )}

        {PublicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};
