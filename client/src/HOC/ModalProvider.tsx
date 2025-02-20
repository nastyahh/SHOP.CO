import { createContext, useState } from "react";
import { Children, modalContextProps } from "../types";

export const ModalContext = createContext<modalContextProps>({
  isModalActive: false,
  setModalActive: () => {},
});

export const ModalProvider = ({ children }: Children) => {
  const [isModalActive, setModalActive] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isModalActive,
        setModalActive,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
