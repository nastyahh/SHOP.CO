import { createContext, useState } from "react";
import { Children, modalContextProps } from "../types";

export const ModalContext = createContext<modalContextProps>({
  isModalActive: false,
  setModalActive: () => {},
  modalContent: null,
  setModalContent: () => {},
});

export const ModalProvider = ({ children }: Children) => {
  const [isModalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  return (
    <ModalContext.Provider
      value={{
        isModalActive,
        setModalActive,
        modalContent,
        setModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
