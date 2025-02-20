import styles from "../Modal/Modal.module.scss";
import { handleInput, handleSubmit } from "../../utils/formHandlers";
import { useContext } from "react";
import { NotificationContext } from "../../HOC/NotificationProvider";

type optionDataType = {
  name: string;
};

type OptionTab = {
  type: string;
  mutation: (data: { name: string }) => Promise<{ data: { message: string } }>;
  optionData: optionDataType;
  setOptionData: (
    data: optionDataType | ((prev: optionDataType) => optionDataType)
  ) => void;
};

export const OptionTabContent = ({
  type,
  mutation,
  optionData,
  setOptionData,
}: OptionTab) => {
  const { showNotification } = useContext(NotificationContext);

  const resetState = () => setOptionData({ name: "" });

  return (
    <form
      className={styles.tabContent}
      onSubmit={(e) =>
        handleSubmit(e, mutation, optionData, showNotification, resetState)
      }
    >
      <div className={styles.inputWrap}>
        <label htmlFor="" className={styles.label}>
          Name
        </label>
        <input
          required
          type="text"
          placeholder={`Enter ${type} name`}
          name="name"
          value={optionData.name}
          onChange={(e) => handleInput(e, setOptionData)}
        />
      </div>
      <button type="submit" className={`primary-btn ${styles.tabContent_btn}`}>
        Create
      </button>
    </form>
  );
};
