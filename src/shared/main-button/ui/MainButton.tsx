import { ReactNode } from "react";
import styles from "./MainButton.module.css";
import type { Color } from "@/shared";

interface MainButtonProps {
  color: Color;
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
}

export default function MainButton({
  children,
  disabled,
  color,
  onClick,
}: MainButtonProps) {
  return (
    <button
      className={`
        ${styles.container}
        ${color === "primary" ? styles.primary : styles.secondary}
        text-md
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
