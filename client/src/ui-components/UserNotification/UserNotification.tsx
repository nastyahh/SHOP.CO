import styles from "./UserNotification.module.scss";

export const UserNotification = ({ isVisible, message }) => {
  return (
    <div
      className={`${styles.notification} 
    ${isVisible ? styles.show : ""}`}
    >
      <p className={styles.notification_text}>{message}</p>
    </div>
  );
};
