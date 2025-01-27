import { createContext, ReactNode, useState } from "react";
import { INotificationContext } from "../types";

export const NotificationContext = createContext<INotificationContext>({
  notification: "",
  showNotification: () => {},
});

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState("");

  const showNotification = (message: string) => {
    setNotification(message);

    setTimeout(() => setNotification(""), 2500);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
