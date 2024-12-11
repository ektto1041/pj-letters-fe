import { HTMLInputTypeAttribute } from "react";
import styles from "./MainInput.module.css";

interface MainInputProps {
  icon: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export default function MainInput({
  icon,
  placeholder = "",
  type = "text",
}: MainInputProps) {
  return (
    <div className={styles.container}>
      <div className={styles["icon-wrapper"]}>
        <img src={icon} alt={icon} />
      </div>
      <input className={`text-md`} placeholder={placeholder} type={type} />
    </div>
  );
}
