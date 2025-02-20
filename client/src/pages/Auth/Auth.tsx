import styles from "./Auth.module.scss";
import "../../sharedStyles.scss";
import { Link, useLocation } from "react-router";
import { useLoginMutation, useSignUpMutation } from "../../redux/productsApi";
import useForm from "../../hooks/useForm";
import Img1 from "../../assets/Image1.png";
import Img2 from "../../assets/Image2.png";
import { useContext } from "react";
import { NotificationContext } from "../../HOC/NotificationProvider";

export const Auth = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const { showNotification } = useContext(NotificationContext);

  const [login] = useLoginMutation();
  const [signUp] = useSignUpMutation();

  const { formState, handleInput, handleForm } = useForm();

  const action = isLoginPage ? login : signUp;

  return (
    <>
      <div className={styles.auth}>
        <div className="container">
          <form
            onSubmit={async (e) => {
              const result = await handleForm(e, action);
              showNotification(result.data.message);
            }}
            className={styles.auth_form}
          >
            <img
              src={Img1}
              alt=""
              className={`${styles.auth_img} ${styles.auth_img_1}`}
            />
            <img
              src={Img2}
              alt=""
              className={`${styles.auth_img} ${styles.auth_img_2}`}
            />
            {!isLoginPage ? (
              <input
                type="text"
                placeholder="Your Username"
                name="username"
                value={formState.username}
                onChange={handleInput}
                className={styles.auth_input}
              />
            ) : null}
            <input
              type="email"
              placeholder="Your Email"
              name="email"
              value={formState.email}
              onChange={handleInput}
              className={styles.auth_input}
            />
            <input
              type="password"
              placeholder="Your Password"
              name="password"
              value={formState.password}
              onChange={handleInput}
              className={styles.auth_input}
            />{" "}
            {!isLoginPage && (
              <div className={`${styles.auth_wrap} ${styles.roleWrap}`}>
                <input
                  type="checkbox"
                  name="role"
                  id="user-role"
                  className={styles.customCheckbox}
                  checked={formState.role === "ADMIN"}
                  onChange={handleInput}
                />
                <label htmlFor="user-role">ADMIN</label>
              </div>
            )}
            <button type="submit" className={`${styles.auth_btn} primary-btn`}>
              {isLoginPage ? "Login" : "Sign Up"}
            </button>
            {isLoginPage ? (
              <p>
                You dont have an account?{" "}
                <Link to="/registration" className={styles.auth_link}>
                  Registration
                </Link>
              </p>
            ) : (
              <p>
                You already have an account?{" "}
                <Link to="/login" className={styles.auth_link}>
                  Login
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
