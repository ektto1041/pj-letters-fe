import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import styles from "./MainInput.module.css";

interface MainInputProps {
  icon: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  maxLength?: number;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function MainInput({
  icon,
  placeholder = "",
  type = "text",
  maxLength,
  value,
  onChange,
}: MainInputProps) {
  return (
    <div className={styles.container}>
      <div className={styles["icon-wrapper"]}>
        <img src={icon} alt={icon} />
      </div>
      <input
        maxLength={maxLength}
        className={`text-md`}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
