import { BaseDialog } from "@/widgets/base-dialog";
import styles from "./SimpleDialog.module.css";
import { ReactNode } from "react";

export interface SimpleDialogProps {
  message: ReactNode;
  positiveLabel: string;
  negativeLabel?: string;
  onClickPositive: () => void;
  onClickNegative?: () => void;
}

export default function SimpleDialog({
  message,
  positiveLabel,
  negativeLabel,
  onClickPositive,
  onClickNegative,
}: SimpleDialogProps) {
  return (
    <BaseDialog>
      <div className={styles.container}>
        <div className={`${styles.message} text-md`}>{message}</div>
        <div className={styles["button-box"]}>
          {onClickNegative && (
            <button
              className={`${styles.negative} text-md`}
              onClick={onClickNegative}
            >
              {negativeLabel}
            </button>
          )}
          <button
            className={`${styles.positive} text-md`}
            onClick={onClickPositive}
            autoFocus
          >
            {positiveLabel}
          </button>
        </div>
      </div>
    </BaseDialog>
  );
}
