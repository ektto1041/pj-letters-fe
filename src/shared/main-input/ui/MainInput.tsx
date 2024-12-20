import type {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
} from "react";
import styles from "./MainInput.module.css";

interface MainInputProps {
  icon: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  maxLength?: number;
  value: string;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export default function MainInput({
  icon,
  placeholder = "",
  type = "text",
  maxLength,
  value,
  disabled,
  onChange,
  onKeyDown,
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
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
