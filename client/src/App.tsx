import { useDispatch } from "react-redux";
import { AppRouter } from "./components/AppRouter";
import { useContext, useEffect, useState } from "react";
import { useCheckAuthQuery } from "./redux/productsApi";
import { logout, setAuth } from "./redux/userSlice";
import { jwtDecode } from "jwt-decode";
import { UserNotification } from "./ui-components/UserNotification/UserNotification";
import { Modal } from "./components/Modal/Modal";
import { ModalContext } from "./HOC/ModalProvider";
import { createPortal } from "react-dom";
import { JwtPayload } from "./types";

export const App = () => {
  const { isModalActive, setModalActive, modalContent, setModalContent } =
    useContext(ModalContext);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { data, error } = useCheckAuthQuery("");

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode<JwtPayload>(data.token);
      const { id, username, email, role } = decoded;

      dispatch(setAuth({ id, username, email, role }));
    } else if (error) {
      logout();
    }

    setLoading(false);
  }, [data]);

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <UserNotification />
          <AppRouter />
          {createPortal(
            <Modal
              isModalActive={isModalActive}
              setModalActive={setModalActive}
              modalContent={modalContent}
              setModalContent={setModalContent}
            />,
            document.body
          )}
        </>
      )}
    </>
  );
};
