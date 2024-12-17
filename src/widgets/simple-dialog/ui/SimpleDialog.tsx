import { BaseDialog } from "@/widgets/base-dialog";
import styles from "./SimpleDialog.module.css";

interface SimpleDialogProps {
  message: string;
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
          <button
            className={`${styles.positive} text-md`}
            onClick={onClickPositive}
          >
            {positiveLabel}
          </button>
          {onClickNegative && (
            <button
              className={`${styles.negative} text-md`}
              onClick={onClickNegative}
            >
              {negativeLabel}
            </button>
          )}
        </div>
      </div>
    </BaseDialog>
  );
}
