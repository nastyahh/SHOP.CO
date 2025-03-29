import "@/sharedStyles.scss";
import styles from "./PasswordModal.module.scss";
import { useContext, useState } from "react";
import { handleInput, handleSubmit } from "@/utils/formHandlers";
import { useAppSelector } from "@/hooks/typedHooks";
import { useChangePasswordMutation } from "@/redux/productsApi";
import { NotificationContext } from "@/HOC/NotificationProvider";

export const PasswordModal = () => {
  const [changePassword] = useChangePasswordMutation();
  const { id } = useAppSelector((state) => state.user.userData);
  const { showNotification } = useContext(NotificationContext);

  const [formState, setFormState] = useState({
    current_password: "",
    new_password: "",
  });

  console.log(id);

  // const handleSub = async (e) => {
  //   e.preventDefault();
  //   console.log({ userId: id, ...formState });
  //   await changePassword({ userId: id, ...formState });
  // };

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
        <div className={styles.inputWrap}>
          <input
            type="password"
            name="current_password"
            placeholder="Enter your current password"
            onChange={(e) => handleInput(e, setFormState)}
            value={formState.current_password}
          />
          <input
            type="text"
            placeholder="Enter your new password"
            name="new_password"
            onChange={(e) => handleInput(e, setFormState)}
            value={formState.new_password}
          />
        </div>
        <button type="submit" className={`primary-btn`}>
          Submit
        </button>
      </form>
    </div>
  );
};
