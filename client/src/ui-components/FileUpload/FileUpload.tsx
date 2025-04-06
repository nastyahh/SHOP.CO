import { useEffect } from "react";
import styles from "./FileUpload.module.scss";

type FileUploadType = {
  label?: string;
  name: string;
  id?: string;
  onChange: (file: File | null) => void;
  value?: File | null;
};

export const FileUpload = ({
  label,
  name,
  id,
  onChange,
  value,
}: FileUploadType) => {
  useEffect(() => console.log(value), [value]);
  return (
    <div className={styles.fileUpload}>
      <label className={styles.label}>{label}</label>
      <label className={styles.inputLabel}>
        <input
          id={id}
          type="file"
          name={name}
          onChange={(e) => {
            console.log(e.target.files);
            const file = e.target.files?.[0] ?? null;
            onChange(file);
            console.log(file);
          }}
        />
        <span>{value ? value.name : "Upload Image"}</span>
      </label>
    </div>
  );
};
