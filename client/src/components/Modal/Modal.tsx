import { modalContextProps } from "../../types";
import styles from "./Modal.module.scss";
import "../../sharedStyles.scss";

export const Modal = ({
  isModalActive,
  setModalActive,
  modalContent,
  setModalContent,
}: modalContextProps) => {
  return (
    <div
      className={`${styles.modal} ${isModalActive ? styles.active : ""}`}
      onClick={() => {
        setModalActive(false);
        setModalContent(null);
      }}
    >
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        {modalContent}
      </div>
    </div>
  );
};
