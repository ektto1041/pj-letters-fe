import styles from "./Header.module.css";
import ArrowBackImg from "@assets/arrow-back.svg";

interface HeaderProps {
  onClickBackButton?: () => void;
  title: string;
}

export default function Header({ title, onClickBackButton }: HeaderProps) {
  return (
    <div className={styles.container}>
      {onClickBackButton ? (
        <button
          className={styles["back-button-wrapper"]}
          onClick={onClickBackButton}
        >
          <img src={ArrowBackImg} alt="ArrowBackImg" />
        </button>
      ) : (
        <div className={styles.empty} />
      )}
      <div className={`${styles.title} text-md`}>{title}</div>
    </div>
  );
}
