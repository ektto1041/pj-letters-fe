import { ChangeEventHandler, useCallback, useState } from "react";
import styles from "./NewCardPage.module.css";
import { cardImgs } from "@/features";
import { Editor } from "@/widgets";

type NewCardPhase = "img" | "title";

export default function NewCardPage() {
  const [phase, setPhase] = useState<NewCardPhase>("img");
  const [selectedImg, setSelectedImg] = useState(0);
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleClickSelectedImg = useCallback(() => {
    setPhase("img");
  }, []);

  const handleClickCardImg = useCallback((cardIdx: number) => {
    setSelectedImg(cardIdx);
    setPhase("title");
  }, []);

  const handleChangeNickname: ChangeEventHandler<HTMLInputElement> =
    useCallback((e) => {
      setNickname(e.target.value);
    }, []);

  const handleChangeTitle: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div
          className={styles["selected-img-wrapper"]}
          onClick={handleClickSelectedImg}
        >
          <img src={cardImgs[selectedImg]} alt="SelectedCardImg" />
          <div
            className={`${styles["img-box-wrapper"]} ${
              phase !== "img" ? styles.closed : ""
            }`}
          >
            <div className={styles["img-box"]}>
              {cardImgs.map((cardImg, i) => (
                <div
                  key={i}
                  className={styles["card-img-wrapper"]}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClickCardImg(i);
                  }}
                >
                  <img src={cardImg} alt="CardImg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <input
          type="text"
          className={`${styles.nickname} text-sm`}
          placeholder="보낸이를 입력하세요"
          disabled={phase === "img"}
          value={nickname}
          onChange={handleChangeNickname}
        />
        <input
          type="text"
          className={`${styles.title} text-md`}
          placeholder="제목을 입력하세요"
          disabled={phase === "img"}
          value={title}
          onChange={handleChangeTitle}
        />
        <div className={styles["editor-wrapper"]}>
          <Editor />
        </div>
      </div>
    </div>
  );
}
