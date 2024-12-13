import { useParams } from "react-router-dom";
import styles from "./TreePage.module.css";
import { Header } from "@/widgets";
import TreeImg from "@assets/tree.svg";
import { MainButton } from "@/shared";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cardImgs, Letter } from "@/features";
import CircleArrowLImg from "@assets/circle-arrow-l.svg";
import CircleArrowRImg from "@assets/circle-arrow-r.svg";

export default function TreePage() {
  const { userId } = useParams();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [letters, setLetters] = useState<Letter[]>([]);
  const [page, setPage] = useState(0);

  const hasNextPage = useMemo(() => {
    const lettersCount = letters.length;
    const nextPageFirstIdx = 5 * page + 5;

    return lettersCount > nextPageFirstIdx;
  }, [letters, page]);

  const timeLeftStr = useMemo(() => {
    return `${timeLeft.days}일 ${timeLeft.hours}시간 ${timeLeft.minutes}분 ${timeLeft.seconds}초`;
  }, [timeLeft]);

  const setTimer = () => {
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

    return timer;
  };

  const getLetters = useCallback(async () => {
    const foundLetters: Letter[] = [
      {
        letterId: "1",
        treeId: "1",
        title: "Letter 1",
        content: "This is Letter 1",
        createdAt: "2024-12-13",
        nickname: "Writer 1",
        card: 1,
      },
      {
        letterId: "2",
        treeId: "1",
        title: "Letter 1",
        content: "This is Letter 1",
        createdAt: "2024-12-13",
        nickname: "Writer 1",
        card: 2,
      },
      {
        letterId: "3",
        treeId: "1",
        title: "Letter 1",
        content: "This is Letter 1",
        createdAt: "2024-12-13",
        nickname: "Writer 1",
        card: 3,
      },
      {
        letterId: "4",
        treeId: "1",
        title: "Letter 1",
        content: "This is Letter 1",
        createdAt: "2024-12-13",
        nickname: "Writer 1",
        card: 4,
      },
      {
        letterId: "5",
        treeId: "1",
        title: "Letter 1",
        content: "This is Letter 1",
        createdAt: "2024-12-13",
        nickname: "Writer 1",
        card: 5,
      },
      {
        letterId: "6",
        treeId: "1",
        title: "Letter 1",
        content: "This is Letter 1",
        createdAt: "2024-12-13",
        nickname: "Writer 1",
        card: 6,
      },
    ];

    setLetters(foundLetters);
  }, []);

  useEffect(() => {
    const timer = setTimer();
    getLetters();

    return () => clearInterval(timer);
  }, [getLetters]);

  const handleClickNextPage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const handleClickPrevPage = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  console.log(page);

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
          {letters.slice(5 * page, 5 * page + 5).map((letter, i) => (
            <div
              className={`${styles["card-wrapper"]} ${styles[`card${i + 1}`]}`}
              key={letter.letterId}
            >
              <img src={cardImgs[letter.card - 1]} alt="CardImg" />
            </div>
          ))}
        </div>
        <div className={styles["button-box"]}>
          <div className={styles["arrow-button-box"]}>
            {page > 0 && (
              <button className={styles.prev} onClick={handleClickPrevPage}>
                <img src={CircleArrowLImg} alt="LeftArrowImg" />
              </button>
            )}
            {hasNextPage && (
              <button className={styles.next} onClick={handleClickNextPage}>
                <img src={CircleArrowRImg} alt="RightArrowImg" />
              </button>
            )}
          </div>
          <MainButton color="primary" onClick={() => {}}>
            친구 목록
          </MainButton>
        </div>
      </div>
    </div>
  );
}
