import { useCallback, useState } from "react";
import styles from "./NewCardPage.module.css";
import { cardImgs } from "@/features";

type NewCardPhase = "img" | "title";

export default function NewCardPage() {
  const [phase, setPhase] = useState<NewCardPhase>("img");
  const [selectedImg, setSelectedImg] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClickSelectedImg = useCallback(() => {
    setPhase("img");
  }, []);

  const handleClickCardImg = useCallback((cardIdx: number) => {
    setSelectedImg(cardIdx);
    setPhase("title");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          className={styles["selected-img-wrapper"]}
          onClick={handleClickSelectedImg}
        >
          <img src={cardImgs[selectedImg]} alt="SelectedCardImg" />
        </div>
        <div
          className={`${styles.triangle} ${
            phase !== "img" ? styles.closed : ""
          }`}
        />
        <div
          className={`${styles["img-box"]} ${
            phase !== "img" ? styles.closed : ""
          }`}
        >
          {cardImgs.map((cardImg, i) => (
            <div
              key={i}
              className={styles["card-img-wrapper"]}
              onClick={() => handleClickCardImg(i)}
            >
              <img src={cardImg} alt="CardImg" />
            </div>
          ))}
        </div>

        <input
          type="text"
          className={styles.title}
          placeholder="제목을 입력하세요"
        />
      </div>
    </div>
  );
}
