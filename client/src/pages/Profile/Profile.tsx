import styles from "./Profile.module.scss";
import "../../sharedStyles.scss";
import { useAppSelector } from "../../hooks/typedHooks";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ModalContext } from "../../HOC/ModalProvider";
import { AdminModal } from "@/components/AdminModal/AdminModal";
import { PasswordModal } from "@/components/PasswordModal/PasswordModal";

export const Profile = () => {
  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const { setModalActive, setModalContent } = useContext(ModalContext);
  const navigate = useNavigate();

  return (
    <div className={styles.profile}>
      <div className="container">
        <div className={styles.profile_info}>
          <div className={styles.profile_info__label}>Your Username</div>
          <div className={styles.profile_info__item}>{user.username}</div>
          <div className={styles.profile_info__label}>Your Email</div>
          <div className={styles.profile_info__item}>{user.email}</div>
          <div className={styles.profile_actions}>
            <button
              className={`primary-btn ${styles.profile_change_password}`}
              onClick={() => {
                setModalActive(true);
                setModalContent(<PasswordModal />);
              }}
            >
              Change password
            </button>
            <button
              className={`primary-btn ${styles.profile_btn}`}
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              Logout
            </button>
            {user.role === "ADMIN" && (
              <button
                className={`primary-btn ${styles.profile_btn}`}
                onClick={() => {
                  setModalContent(<AdminModal />);
                  setModalActive(true);
                }}
              >
                Open Admin Panel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
