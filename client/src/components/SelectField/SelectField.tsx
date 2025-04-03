import styles from "./SelectField.module.scss";

type SelectFieldType = {
  label?: string;
  required?: boolean;
  name: string;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
  options: { value: string | number; label: string }[];
};

export const SelectField = ({
  label,
  required = false,
  name,
  id,
  onChange,
  value,
  options,
}: SelectFieldType) => {
  return (
    <div className={styles.inputWrap}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <select
        name={name}
        id={id}
        onChange={onChange}
        required={required}
        value={value}
      >
        <option value="" disabled hidden>
          Select...
        </option>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};
