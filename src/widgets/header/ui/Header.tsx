import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import ArrowBackImg from "@assets/arrow-back.svg";

interface HeaderProps {
  onClickBackButton?: () => void;
  title: string;
  onClickHeader?: () => void;
}

const calcXmas = () => {
  const christmasDay = new Date("2024-12-24T15:00:00");

  const now = new Date();
  const difference = christmasDay.getTime() - now.getTime();

  return difference <= 0;
};

export default function Header({
  title,
  onClickBackButton,
  onClickHeader,
}: HeaderProps) {
  const [isXmas, setXmas] = useState(calcXmas());
  let timer: number | undefined;

  const setTimer = () => {
    const xmas = calcXmas();

    if (xmas) {
      setXmas(true);
    } else {
      const timer = setInterval(() => {
        const now = new Date();
        const difference =
          new Date("2024-12-24T15:00:00").getTime() - now.getTime();

        if (difference <= 0) {
          clearInterval(timer);
          setXmas(true);
        }
      }, 1000);
    }

    return timer;
  };

  useEffect(() => {
    const timer = setTimer();

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`${styles.container} ${isXmas ? styles.xmas : ""}`}>
      <div className={styles.content}>
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
    </div>
  );
}
