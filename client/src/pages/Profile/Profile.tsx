import styles from "./Profile.module.scss";
import "../../sharedStyles.scss";
import { useAppSelector } from "../../hooks/typedHooks";
import { logout } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export const Profile = () => {
  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.profile}>
      <div className="container">
        <div className={styles.profile_info}>
          <div className={styles.profile_info__label}>Your Username</div>
          <div className={styles.profile_info__item}>{user.username}</div>
          <div className={styles.profile_info__label}>Your Email</div>
          <div className={styles.profile_info__item}>{user.email}</div>
          <button
            className={`primary-btn ${styles.profile_logout}`}
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
