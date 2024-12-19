import styles from "./Header.module.css";
import ArrowBackImg from "@assets/arrow-back.svg";

interface HeaderProps {
  onClickBackButton?: () => void;
  title: string;
  onClickHeader?: () => void;
}

export default function Header({
  title,
  onClickBackButton,
  onClickHeader,
}: HeaderProps) {
  return (
    <div className={styles.container}>
      {onClickBackButton && (
        <button
          className={styles["back-button-wrapper"]}
          onClick={onClickBackButton}
        >
          <img src={ArrowBackImg} alt="ArrowBackImg" />
        </button>
      )}
      <div
        className={`${styles.title} text-md ${
          onClickHeader ? styles.pointer : ""
        }`}
        onClick={onClickHeader}
      >
        {title}
      </div>
    </div>
  );
}
