import { useDispatch } from "react-redux";
import { AppRouter } from "./components/AppRouter";
import { useEffect, useState } from "react";
import { useCheckAuthQuery } from "./redux/productsApi";
import { logout, setAuth } from "./redux/userSlice";
import { jwtDecode } from "jwt-decode";

export const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { data, error } = useCheckAuthQuery("");

  useEffect(() => {
    if (data) {
      console.log(data);
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      console.log(decoded);
      console.log("localstorage:", localStorage.getItem("token"));
      const { username, email, role } = decoded;
      dispatch(setAuth({ username, email, role }));
    } else if (error) {
      logout();
    }

    setLoading(false);
  }, [data]);

  return (
    <>
      <AppRouter />
    </>
  );
};
