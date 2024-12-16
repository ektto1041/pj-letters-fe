import { ReactNode } from "react";
import styles from "./TextButton.module.css";

interface TextButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export default function TextButton({ onClick, children }: TextButtonProps) {
  return (
    <button className={`${styles.container} text-sm`} onClick={onClick}>
      {children}
    </button>
  );
}
