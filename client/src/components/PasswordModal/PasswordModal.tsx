import "@/sharedStyles.scss";
import styles from "./PasswordModal.module.scss";
import { useContext, useState } from "react";
import { handleInput, handleSubmit } from "@/utils/formHandlers";
import { useAppSelector } from "@/hooks/typedHooks";
import { useChangePasswordMutation } from "@/redux/productsApi";
import { NotificationContext } from "@/HOC/NotificationProvider";
import { Input } from "../Input/Input";

export const PasswordModal = () => {
  const [changePassword] = useChangePasswordMutation();
  const { id } = useAppSelector((state) => state.user.userData);
  const { showNotification } = useContext(NotificationContext);

  const [formState, setFormState] = useState({
    current_password: "",
    new_password: "",
  });

  return (
    <div className={styles.contentWrap}>
      <h2 className="title">Change Password</h2>
      <form
        onSubmit={(e) => {
          handleSubmit(
            e,
            changePassword,
            { userId: id, ...formState },
            showNotification,
            () =>
              setFormState({
                current_password: "",
                new_password: "",
              })
          );
        }}
      >
        <Input
          label="Your current password"
          name="current_password"
          type="password"
          placeholder="Enter..."
          value={formState.current_password}
          onChange={(e) => handleInput(e, setFormState)}
        />
        <Input
          label="Your new password"
          type="password"
          placeholder="Enter..."
          name="new_password"
          onChange={(e) => handleInput(e, setFormState)}
          value={formState.new_password}
        />
        <button type="submit" className={`primary-btn ${styles.submitBtn}`}>
          Submit
        </button>
      </form>
    </div>
  );
};
