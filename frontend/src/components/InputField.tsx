import { ChangeEvent } from "react";
import styles from "./InputField.module.css";

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const InputField = ({ label, id, name, type = "text", onChange, value }: InputFieldProps) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
