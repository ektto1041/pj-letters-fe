import { Spinner } from "@/shared";
import styles from "./LoadingPage.module.css";

export default function LoadingPage() {
  return (
    <div className={styles.container}>
      <Spinner />
    </div>
  );
}
