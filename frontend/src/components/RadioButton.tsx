import { ChangeEvent } from "react";
import styles from "./RadioButton.module.css";

interface RadioButtonProps {
  id: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  checked: boolean;
}

const RadioButton = ({ id, label, onChange, value, checked }: RadioButtonProps) => {
  return (
    <div className={styles.radioButton}>
      <label className={styles.radioLabel} htmlFor={id}>
        <input
          name='type'
          type='radio'
          className={styles.radioInput}
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <span className={styles.radioCheckmark}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
          >
            <circle data-name='ellipse' cx='8' cy='8' r='8'></circle>
          </svg>
        </span>
      </label>
      <label className={styles.radioText} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
