import styles from "./Input.module.scss";

export const Input = ({ type, placeholder, name, value, onChangeFunc }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChangeFunc}
      className={styles.input}
    />
  );
};
