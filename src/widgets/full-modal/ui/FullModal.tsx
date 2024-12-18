import { ReactNode } from "react";
import styles from "./FullModal.module.css";
import CloseImg from "@assets/close.svg";

interface FullModalProps {
  title: string;
  onClose?: () => void;
  children: ReactNode;
}

export default function FullModal({
  title,
  onClose,
  children,
}: FullModalProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={`${styles.title} header-h4`}>{title}</div>
          {onClose && (
            <button className={styles["close-button"]} onClick={onClose}>
              <img src={CloseImg} alt="CloseImg" />
            </button>
          )}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
