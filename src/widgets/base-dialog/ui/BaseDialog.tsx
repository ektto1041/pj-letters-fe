import { ReactNode } from "react";
import styles from "./BaseDialog.module.css";

interface BaseDialogProps {
  children: ReactNode;
}

export default function BaseDialog({ children }: BaseDialogProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
