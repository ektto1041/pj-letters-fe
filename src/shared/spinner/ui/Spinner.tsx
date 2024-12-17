import styles from "./Spinner.module.css";
import SpinnerImg from "@assets/spinner.gif";

export default function Spinner() {
  return (
    <div className={styles.container}>
      <div className={styles["img-wrapper"]}>
        <img src={SpinnerImg} alt="Spinner" />
      </div>
    </div>
  );
}
