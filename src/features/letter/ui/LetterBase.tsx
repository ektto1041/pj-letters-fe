import { ReactNode, RefObject } from "react";
import styles from "./LetterBase.module.css";
import CloseImg from "@assets/close.svg";

interface LetterBaseProps {
  onClose: () => void;
  children: ReactNode;
  refs?: RefObject<HTMLDivElement>;
}

export default function LetterBase({
  onClose,
  children,
  refs,
}: LetterBaseProps) {
  return (
    <div className={styles.container} ref={refs}>
      <div className={styles.content}>
        <button className={styles["close-button"]} onClick={onClose}>
          <img src={CloseImg} alt="CloseButton" />
        </button>
        {children}
      </div>
    </div>
  );
}
