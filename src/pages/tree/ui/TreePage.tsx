import { useParams } from "react-router-dom";
import styles from "./TreePage.module.css";
import { Header } from "@/widgets";
import TreeImg from "@assets/tree.svg";
import { MainButton } from "@/shared";
import { useEffect, useMemo, useState } from "react";

export default function TreePage() {
  const { userId } = useParams();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const timeLeftStr = useMemo(() => {
    return `${timeLeft.days}일 ${timeLeft.hours}시간 ${timeLeft.minutes}분 ${timeLeft.seconds}초`;
  }, [timeLeft]);

  useEffect(() => {
    const christmasDay = new Date("2024-12-25T00:00:00");

    const timer = setInterval(() => {
      const now = new Date();
      const difference = christmasDay.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <div className={styles.container}>
      <div className={styles.ground} />
      <div className={styles.header}>
        <Header title="나의 트리" />
        <div className={styles["timer-wrapper"]}>
          <div className={styles.timer}>{timeLeftStr}</div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles["img-wrapper"]}>
          <img src={TreeImg} alt="tree" />
        </div>
        <div className={styles["button-box"]}>
          <MainButton color="primary" onClick={() => {}}>
            친구 목록
          </MainButton>
        </div>
      </div>
    </div>
  );
}
