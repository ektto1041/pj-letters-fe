import {
  ForwardedRef,
  forwardRef,
  type ChangeEventHandler,
  type HTMLInputTypeAttribute,
  type KeyboardEventHandler,
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
  autoFocus?: boolean;
}
export const MainInput = forwardRef(
  (
    {
      icon,
      placeholder = "",
      type = "text",
      maxLength,
      value,
      disabled,
      onChange,
      onKeyDown,
      autoFocus,
    }: MainInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={styles.container}>
        <div className={styles["icon-wrapper"]}>
          <img src={icon} alt={icon} />
        </div>
        <input
          ref={ref}
          maxLength={maxLength}
          className={`text-md`}
          placeholder={placeholder}
          type={type}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus={autoFocus}
        />
      </div>
    );
  }
);

export default MainInput;
