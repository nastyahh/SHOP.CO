import { useContext } from "react";
import styles from "./UserNotification.module.scss";
import { NotificationContext } from "../../HOC/NotificationProvider";

export const UserNotification = () => {
  const { notification } = useContext(NotificationContext);

  if (!notification) return null;

  return (
    <div className={styles.notification}>
      <p className={styles.notification_text}>{notification}</p>
    </div>
  );
};
