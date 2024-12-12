import { ReactNode } from "react";
import styles from "./TextButton.module.css";

interface TextButtonProps {
  children: ReactNode;
}

export default function TextButton({ children }: TextButtonProps) {
  return <button className={`${styles.container} text-md`}>{children}</button>;
}
