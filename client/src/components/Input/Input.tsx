import styles from "./Input.module.scss";

type InputField = {
  label?: string;
  required?: boolean;
  name: string;
  type: string;
  placeholder?: string;
  value: string | number | undefined | readonly string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const Input = ({
  label,
  required = false,
  name,
  type,
  placeholder = "",
  value,
  onChange,
  className,
}: InputField) => {
  return (
    <div className={styles.inputWrap}>
      {label && (
        <label htmlFor="" className={styles.label}>
          {label}
        </label>
      )}
      <input
        type={type}
        required={required}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${className ? className : ""}`}
      />
    </div>
  );
};
