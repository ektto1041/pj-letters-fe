import styles from "./CheckBox.module.css";
import CheckImg from "@assets/check.svg";

interface CheckBoxProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function CheckBox({ label, value, onChange }: CheckBoxProps) {
  return (
    <div className={styles.container} onClick={() => onChange(!value)}>
      <div className={`${styles.circle} ${value ? styles.checked : ""}`}>
        <div
          className={`${styles["inner-circle"]} ${value ? styles.checked : ""}`}
        >
          <img src={CheckImg} alt="CheckImg" />
        </div>
      </div>
      <div className={`${styles.label} ${value ? styles.checked : ""}`}>
        {label}
      </div>
    </div>
  );
}
